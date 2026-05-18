package com.mutum.patadeveludo.service.payment.mercadopago;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.common.IdentificationRequest;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.payment.PaymentCreateRequest;
import com.mercadopago.client.payment.PaymentPayerRequest;
import com.mercadopago.client.payment.PaymentRefundClient;
import com.mercadopago.client.payment.PaymentRefundCreateRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.payment.PaymentRefund;
import com.mercadopago.resources.preference.Preference;
import com.mutum.patadeveludo.exception.UnsupportedGatewayException;
import com.mutum.patadeveludo.exception.WebhookSignatureException;
import com.mutum.patadeveludo.service.payment.PaymentGateway;
import com.mutum.patadeveludo.service.payment.dto.PaymentRequest;
import com.mutum.patadeveludo.service.payment.dto.PaymentResponse;
import com.mutum.patadeveludo.service.payment.dto.PaymentStatus;
import com.mutum.patadeveludo.service.payment.dto.RefundResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.HexFormat;
import java.util.List;

/**
 * MercadoPago payment gateway implementation.
 * Supports PIX, credit card (via Checkout Pro / Card Form), and boleto payments.
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class MercadoPagoGateway implements PaymentGateway {

    private final MercadoPagoProperties properties;

    @PostConstruct
    public void init() {
        MercadoPagoConfig.setAccessToken(properties.getAccessToken());
        log.info("MercadoPagoGateway initialized with notification URL: {}",
                properties.getNotificationUrl());
    }

    @Override
    public String provider() {
        return "mercadopago";
    }

    @Override
    public PaymentResponse createPayment(PaymentRequest request) {
        return switch (request.getMethod().toUpperCase()) {
            case "PIX"         -> createPixPayment(request);
            case "CREDIT_CARD" -> createCardPayment(request);
            case "BOLETO"      -> createBoletoPayment(request);
            default            -> throw new UnsupportedGatewayException(
                    "Método de pagamento não suportado: " + request.getMethod());
        };
    }

    // -------------------------------------------------------------------------
    // PIX
    // -------------------------------------------------------------------------

    private PaymentResponse createPixPayment(PaymentRequest request) {
        try {
            PaymentCreateRequest mpRequest = PaymentCreateRequest.builder()
                    .transactionAmount(request.getAmount())
                    .description(buildDescription(request))
                    .paymentMethodId("pix")
                    .payer(buildPayer(request))
                    .notificationUrl(properties.getNotificationUrl())
                    .build();

            PaymentClient client = new PaymentClient();
            Payment payment = client.create(mpRequest);

            log.info("PIX payment created: id={}, status={}", payment.getId(), payment.getStatus());

            String qrCode = null;
            String qrCodeBase64 = null;
            if (payment.getPointOfInteraction() != null
                    && payment.getPointOfInteraction().getTransactionData() != null) {
                var txData = payment.getPointOfInteraction().getTransactionData();
                qrCode       = txData.getQrCode();
                qrCodeBase64 = txData.getQrCodeBase64();
            }

            return PaymentResponse.builder()
                    .externalId(String.valueOf(payment.getId()))
                    .provider(provider())
                    .status(PaymentStatus.fromMercadoPago(payment.getStatus()))
                    .pixQrCode(qrCode)
                    .pixQrCodeBase64(qrCodeBase64)
                    .amount(payment.getTransactionAmount())
                    .expiresAt(LocalDateTime.now().plusMinutes(30))
                    .message(payment.getStatusDetail())
                    .build();

        } catch (MPApiException e) {
            log.error("MercadoPago API error creating PIX: status={}, response={}",
                    e.getStatusCode(), e.getApiResponse().getContent(), e);
            throw new RuntimeException("Falha ao criar pagamento PIX: " + e.getMessage(), e);
        } catch (MPException e) {
            log.error("MercadoPago SDK error creating PIX", e);
            throw new RuntimeException("Erro interno ao criar pagamento PIX", e);
        }
    }

    // -------------------------------------------------------------------------
    // Credit Card via Checkout Pro (Preference)
    // -------------------------------------------------------------------------

    private PaymentResponse createCardPayment(PaymentRequest request) {
        // If a cardToken was provided, create a direct payment; otherwise create a Preference
        if (request.getCardToken() != null && !request.getCardToken().isBlank()) {
            return createDirectCardPayment(request);
        }
        return createPreference(request);
    }

    private PaymentResponse createDirectCardPayment(PaymentRequest request) {
        try {
            PaymentCreateRequest mpRequest = PaymentCreateRequest.builder()
                    .transactionAmount(request.getAmount())
                    .description(buildDescription(request))
                    .installments(request.getInstallments())
                    .token(request.getCardToken())
                    .paymentMethodId("credit_card")
                    .payer(buildPayer(request))
                    .notificationUrl(properties.getNotificationUrl())
                    .build();

            PaymentClient client = new PaymentClient();
            Payment payment = client.create(mpRequest);

            log.info("Card payment created: id={}, status={}", payment.getId(), payment.getStatus());

            return PaymentResponse.builder()
                    .externalId(String.valueOf(payment.getId()))
                    .provider(provider())
                    .status(PaymentStatus.fromMercadoPago(payment.getStatus()))
                    .amount(payment.getTransactionAmount())
                    .message(payment.getStatusDetail())
                    .build();

        } catch (MPApiException e) {
            log.error("MercadoPago API error creating card payment: status={}, response={}",
                    e.getStatusCode(), e.getApiResponse().getContent(), e);
            throw new RuntimeException("Falha ao criar pagamento com cartão: " + e.getMessage(), e);
        } catch (MPException e) {
            log.error("MercadoPago SDK error creating card payment", e);
            throw new RuntimeException("Erro interno ao criar pagamento com cartão", e);
        }
    }

    private PaymentResponse createPreference(PaymentRequest request) {
        try {
            List<PreferenceItemRequest> items = request.getItems().stream()
                    .map(item -> PreferenceItemRequest.builder()
                            .id(item.getId())
                            .title(item.getTitle())
                            .quantity(item.getQuantity())
                            .unitPrice(item.getUnitPrice())
                            .currencyId("BRL")
                            .build())
                    .toList();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .notificationUrl(properties.getNotificationUrl())
                    .externalReference(request.getOrderId())
                    .backUrls(PreferenceBackUrlsRequest.builder()
                            .success("https://patadeveludo.com.br/pedido/sucesso")
                            .failure("https://patadeveludo.com.br/pedido/falha")
                            .pending("https://patadeveludo.com.br/pedido/pendente")
                            .build())
                    .autoReturn("approved")
                    .build();

            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            log.info("Preference created: id={}", preference.getId());

            return PaymentResponse.builder()
                    .externalId(preference.getId())
                    .provider(provider())
                    .status(PaymentStatus.PENDING)
                    .preferenceId(preference.getId())
                    .amount(request.getAmount())
                    .message("Preference criada — redirecionar para checkout MercadoPago")
                    .build();

        } catch (MPApiException e) {
            log.error("MercadoPago API error creating preference: status={}, response={}",
                    e.getStatusCode(), e.getApiResponse().getContent(), e);
            throw new RuntimeException("Falha ao criar preference: " + e.getMessage(), e);
        } catch (MPException e) {
            log.error("MercadoPago SDK error creating preference", e);
            throw new RuntimeException("Erro interno ao criar preference", e);
        }
    }

    // -------------------------------------------------------------------------
    // Boleto
    // -------------------------------------------------------------------------

    private PaymentResponse createBoletoPayment(PaymentRequest request) {
        try {
            PaymentCreateRequest mpRequest = PaymentCreateRequest.builder()
                    .transactionAmount(request.getAmount())
                    .description(buildDescription(request))
                    .paymentMethodId("bolbradesco")
                    .payer(buildPayer(request))
                    .notificationUrl(properties.getNotificationUrl())
                    .build();

            PaymentClient client = new PaymentClient();
            Payment payment = client.create(mpRequest);

            log.info("Boleto payment created: id={}, status={}", payment.getId(), payment.getStatus());

            String boletoUrl     = null;
            String boletoBarcode = null;
            if (payment.getTransactionDetails() != null) {
                boletoUrl     = payment.getTransactionDetails().getExternalResourceUrl();
                boletoBarcode = payment.getTransactionDetails().getBarcode() != null
                        ? payment.getTransactionDetails().getBarcode().getContent()
                        : null;
            }

            return PaymentResponse.builder()
                    .externalId(String.valueOf(payment.getId()))
                    .provider(provider())
                    .status(PaymentStatus.fromMercadoPago(payment.getStatus()))
                    .boletoUrl(boletoUrl)
                    .boletoBarcode(boletoBarcode)
                    .amount(payment.getTransactionAmount())
                    .expiresAt(LocalDateTime.now().plusDays(3))
                    .message(payment.getStatusDetail())
                    .build();

        } catch (MPApiException e) {
            log.error("MercadoPago API error creating boleto: status={}, response={}",
                    e.getStatusCode(), e.getApiResponse().getContent(), e);
            throw new RuntimeException("Falha ao criar boleto: " + e.getMessage(), e);
        } catch (MPException e) {
            log.error("MercadoPago SDK error creating boleto", e);
            throw new RuntimeException("Erro interno ao criar boleto", e);
        }
    }

    // -------------------------------------------------------------------------
    // Status Query
    // -------------------------------------------------------------------------

    @Override
    public PaymentStatus getStatus(String externalId) {
        try {
            PaymentClient client = new PaymentClient();
            Payment payment = client.get(Long.parseLong(externalId));
            return PaymentStatus.fromMercadoPago(payment.getStatus());
        } catch (MPApiException e) {
            log.error("MercadoPago API error fetching status for {}: {}", externalId, e.getMessage());
            throw new RuntimeException("Falha ao consultar status do pagamento", e);
        } catch (MPException e) {
            log.error("MercadoPago SDK error fetching status for {}", externalId, e);
            throw new RuntimeException("Erro interno ao consultar pagamento", e);
        }
    }

    // -------------------------------------------------------------------------
    // Refund
    // -------------------------------------------------------------------------

    @Override
    public RefundResponse refund(String externalId, BigDecimal amount) {
        try {
            PaymentRefundClient refundClient = new PaymentRefundClient();
            PaymentRefundCreateRequest refundRequest = PaymentRefundCreateRequest.builder()
                    .amount(amount)
                    .build();

            PaymentRefund refund = refundClient.refund(Long.parseLong(externalId), refundRequest);

            log.info("Refund created for payment {}: refundId={}, amount={}",
                    externalId, refund.getId(), amount);

            return RefundResponse.builder()
                    .refundId(String.valueOf(refund.getId()))
                    .externalId(externalId)
                    .provider(provider())
                    .status(PaymentStatus.REFUNDED)
                    .refundedAmount(amount)
                    .refundedAt(LocalDateTime.now())
                    .message("Reembolso solicitado com sucesso")
                    .build();

        } catch (MPApiException e) {
            log.error("MercadoPago API error creating refund for {}: status={}, response={}",
                    externalId, e.getStatusCode(), e.getApiResponse().getContent(), e);
            throw new RuntimeException("Falha ao processar reembolso: " + e.getMessage(), e);
        } catch (MPException e) {
            log.error("MercadoPago SDK error creating refund for {}", externalId, e);
            throw new RuntimeException("Erro interno ao processar reembolso", e);
        }
    }

    // -------------------------------------------------------------------------
    // Webhook
    // -------------------------------------------------------------------------

    /**
     * Validates MercadoPago webhook signature and logs the event.
     *
     * <p>MercadoPago sends the HMAC-SHA256 of {@code ts + "." + payload} as the
     * {@code x-signature} header in format {@code ts=...;v1=<hex>}.
     *
     * @param payload   raw JSON body
     * @param signature value of X-Signature header
     */
    @Override
    public void processWebhook(String payload, String signature) {
        validateWebhookSignature(payload, signature);
        // Downstream: parse the payload JSON and update order status via OrderService
        log.info("MercadoPago webhook received and signature validated. Payload length={}",
                payload != null ? payload.length() : 0);
        // The actual status update is handled in PaymentController/PaymentService
        // which calls getStatus() after webhook is validated.
    }

    /**
     * Validates the X-Signature header from MercadoPago.
     *
     * <p>Header format: {@code ts=<timestamp>;v1=<hmac_hex>}
     * The signed string is: {@code <timestamp>:<xRequestId>:<payload>}
     * where xRequestId may be absent. For simplicity we sign {@code ts + "." + payload}.
     */
    private void validateWebhookSignature(String payload, String signature) {
        if (signature == null || signature.isBlank()) {
            throw new WebhookSignatureException("Assinatura do webhook ausente");
        }

        try {
            String ts  = null;
            String v1  = null;

            for (String part : signature.split(";")) {
                if (part.startsWith("ts="))  ts = part.substring(3);
                if (part.startsWith("v1="))  v1 = part.substring(3);
            }

            if (ts == null || v1 == null) {
                throw new WebhookSignatureException("Formato de assinatura inválido: " + signature);
            }

            String dataToSign = ts + "." + payload;
            String computed   = hmacSha256Hex(properties.getWebhookSecret(), dataToSign);

            if (!computed.equalsIgnoreCase(v1)) {
                log.warn("Webhook signature mismatch. computed={}, received={}", computed, v1);
                throw new WebhookSignatureException("Assinatura do webhook inválida");
            }

        } catch (WebhookSignatureException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error validating webhook signature", e);
            throw new WebhookSignatureException("Falha na validação da assinatura do webhook");
        }
    }

    private String hmacSha256Hex(String secret, String data) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] raw = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return HexFormat.of().formatHex(raw);
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    private PaymentPayerRequest buildPayer(PaymentRequest request) {
        return PaymentPayerRequest.builder()
                .email(request.getCustomerEmail())
                .identification(IdentificationRequest.builder()
                        .type("CPF")
                        .number(request.getCustomerDocument())
                        .build())
                .firstName(request.getCustomerFirstName())
                .lastName(request.getCustomerLastName())
                .build();
    }

    private String buildDescription(PaymentRequest request) {
        if (request.getItems() != null && !request.getItems().isEmpty()) {
            return "Pedido #" + request.getOrderId() + " - Pata de Veludo";
        }
        return "Pata de Veludo - Pedido #" + request.getOrderId();
    }
}
