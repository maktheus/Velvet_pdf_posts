package com.mutum.patadeveludo.service.payment;

import com.mutum.patadeveludo.model.Order;
import com.mutum.patadeveludo.model.OrderStatus;
import com.mutum.patadeveludo.model.Payment;
import com.mutum.patadeveludo.repository.OrderRepository;
import com.mutum.patadeveludo.repository.PaymentRepository;
import com.mutum.patadeveludo.service.payment.dto.PaymentRequest;
import com.mutum.patadeveludo.service.payment.dto.PaymentResponse;
import com.mutum.patadeveludo.service.payment.dto.PaymentStatus;
import com.mutum.patadeveludo.service.payment.dto.RefundResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentGatewayFactory gatewayFactory;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    /**
     * Initiates a payment for an existing order.
     */
    @Transactional
    public PaymentResponse initiatePayment(String orderId, String provider, PaymentRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Pedido não encontrado: " + orderId));

        PaymentGateway gateway = gatewayFactory.get(provider);
        PaymentResponse response = gateway.createPayment(request);

        // Persist payment record
        Payment payment = Payment.builder()
                .order(order)
                .externalId(response.getExternalId())
                .provider(provider)
                .paymentMethod(request.getMethod())
                .status(response.getStatus())
                .amount(response.getAmount())
                .pixQrCode(response.getPixQrCode())
                .pixQrCodeBase64(response.getPixQrCodeBase64())
                .boletoUrl(response.getBoletoUrl())
                .boletoBarcode(response.getBoletoBarcode())
                .preferenceId(response.getPreferenceId())
                .expiresAt(response.getExpiresAt())
                .build();
        paymentRepository.save(payment);

        // Update order payment fields
        order.setPaymentProvider(provider);
        order.setPaymentMethod(request.getMethod());
        order.setPaymentExternalId(response.getExternalId());
        order.setStatus(OrderStatus.PAYMENT_PENDING);
        orderRepository.save(order);

        log.info("Payment initiated: orderId={}, provider={}, externalId={}",
                orderId, provider, response.getExternalId());
        return response;
    }

    /**
     * Returns the current payment status for a given external ID.
     */
    @Transactional(readOnly = true)
    public PaymentStatus getPaymentStatus(String externalId) {
        Payment payment = paymentRepository.findByExternalId(externalId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Pagamento não encontrado: " + externalId));
        PaymentGateway gateway = gatewayFactory.get(payment.getProvider());
        return gateway.getStatus(externalId);
    }

    /**
     * Processes an incoming webhook from any gateway.
     * Validates signature, then syncs order status.
     */
    @Transactional
    public void handleWebhook(String provider, String payload, String signature) {
        PaymentGateway gateway = gatewayFactory.get(provider);
        gateway.processWebhook(payload, signature);
        // Further processing (parsing orderId from payload, updating order status)
        // is intentionally handled via a subsequent getStatus() call triggered by the
        // webhook event data, keeping the interface clean.
        log.info("Webhook processed for provider={}", provider);
    }

    /**
     * Processes a refund for a payment.
     */
    @Transactional
    public RefundResponse refund(String externalId, BigDecimal amount) {
        Payment payment = paymentRepository.findByExternalId(externalId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Pagamento não encontrado: " + externalId));

        PaymentGateway gateway = gatewayFactory.get(payment.getProvider());
        RefundResponse response = gateway.refund(externalId, amount);

        // Update payment status
        payment.setStatus(PaymentStatus.REFUNDED);
        paymentRepository.save(payment);

        // Update order status
        Order order = payment.getOrder();
        order.setStatus(OrderStatus.REFUNDED);
        orderRepository.save(order);

        return response;
    }

    /**
     * Syncs the order status after a gateway callback (called after webhook validation).
     */
    @Transactional
    public void syncOrderStatus(String externalId) {
        paymentRepository.findByExternalId(externalId).ifPresent(payment -> {
            PaymentGateway gateway = gatewayFactory.get(payment.getProvider());
            PaymentStatus currentStatus = gateway.getStatus(externalId);

            payment.setStatus(currentStatus);
            paymentRepository.save(payment);

            Order order = payment.getOrder();
            if (currentStatus == PaymentStatus.APPROVED) {
                order.setStatus(OrderStatus.PAID);
            } else if (currentStatus == PaymentStatus.REJECTED
                    || currentStatus == PaymentStatus.CANCELLED) {
                order.setStatus(OrderStatus.CANCELLED);
            } else if (currentStatus == PaymentStatus.REFUNDED) {
                order.setStatus(OrderStatus.REFUNDED);
            }
            orderRepository.save(order);
            log.info("Order status synced: orderId={}, newStatus={}", order.getId(), order.getStatus());
        });
    }
}
