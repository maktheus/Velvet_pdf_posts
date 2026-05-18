package com.mutum.patadeveludo.controller;

import com.mutum.patadeveludo.service.payment.PaymentGatewayFactory;
import com.mutum.patadeveludo.service.payment.PaymentService;
import com.mutum.patadeveludo.service.payment.dto.PaymentRequest;
import com.mutum.patadeveludo.service.payment.dto.PaymentResponse;
import com.mutum.patadeveludo.service.payment.dto.PaymentStatus;
import com.mutum.patadeveludo.service.payment.dto.RefundResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Payments", description = "Payment processing endpoints")
public class PaymentController {

    private final PaymentService paymentService;
    private final PaymentGatewayFactory gatewayFactory;

    /**
     * Initiates a payment for an existing order.
     * The frontend sends orderId + provider + paymentMethod; this returns
     * the Pix QR code, boleto URL, or Preference ID depending on the method.
     */
    @PostMapping("/init")
    @Operation(summary = "Initiate payment", description = "Creates a payment via the specified gateway/method")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<PaymentResponse> initiatePayment(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestBody InitPaymentRequest request) {

        PaymentRequest paymentRequest = PaymentRequest.builder()
                .orderId(request.getOrderId())
                .amount(request.getAmount())
                .method(request.getMethod())
                .customerEmail(request.getCustomerEmail())
                .customerDocument(request.getCustomerDocument())
                .customerFirstName(request.getCustomerFirstName())
                .customerLastName(request.getCustomerLastName())
                .installments(request.getInstallments() != null ? request.getInstallments() : 1)
                .cardToken(request.getCardToken())
                .items(request.getItems())
                .build();

        PaymentResponse response = paymentService.initiatePayment(
                request.getOrderId(),
                request.getProvider(),
                paymentRequest);

        return ResponseEntity.ok(response);
    }

    /**
     * Returns the current status of a payment.
     */
    @GetMapping("/{externalId}")
    @Operation(summary = "Get payment status")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<PaymentStatus> getStatus(@PathVariable String externalId) {
        return ResponseEntity.ok(paymentService.getPaymentStatus(externalId));
    }

    /**
     * Webhook endpoint — receives notifications from payment gateways.
     * This endpoint is PUBLIC (no JWT required), but signature validation
     * happens inside the gateway implementation.
     *
     * @param provider  gateway identifier in the URL, e.g. "mercadopago"
     * @param payload   raw request body
     * @param signature X-Signature header (MercadoPago format)
     */
    @PostMapping("/webhook")
    @Operation(summary = "Payment webhook", description = "Receives notifications from payment gateways")
    public ResponseEntity<Void> webhook(
            @RequestParam(defaultValue = "mercadopago") String provider,
            @RequestBody String payload,
            @RequestHeader(value = "X-Signature", required = false) String signature) {

        log.info("Webhook received from provider={}, payloadLength={}",
                provider, payload != null ? payload.length() : 0);

        paymentService.handleWebhook(provider, payload, signature);
        return ResponseEntity.ok().build();
    }

    /**
     * Issues a refund for an approved payment. Admin only.
     */
    @PostMapping("/{externalId}/refund")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Refund payment", description = "Issues a full or partial refund. Admin only.")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<RefundResponse> refund(
            @PathVariable String externalId,
            @RequestBody RefundRequest request) {

        return ResponseEntity.ok(paymentService.refund(externalId, request.getAmount()));
    }

    // -------------------------------------------------------------------------
    // Request DTOs (inner classes — kept here for locality)
    // -------------------------------------------------------------------------

    @Data
    public static class InitPaymentRequest {
        private String orderId;
        private BigDecimal amount;
        private String provider;    // "mercadopago"
        private String method;      // "PIX", "CREDIT_CARD", "BOLETO"
        private String customerEmail;
        private String customerDocument;
        private String customerFirstName;
        private String customerLastName;
        private Integer installments;
        private String cardToken;
        private java.util.List<PaymentRequest.PaymentItem> items;
    }

    @Data
    public static class RefundRequest {
        private BigDecimal amount;
    }
}
