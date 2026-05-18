package com.mutum.patadeveludo.service.payment;

import com.mutum.patadeveludo.service.payment.dto.PaymentRequest;
import com.mutum.patadeveludo.service.payment.dto.PaymentResponse;
import com.mutum.patadeveludo.service.payment.dto.PaymentStatus;
import com.mutum.patadeveludo.service.payment.dto.RefundResponse;

import java.math.BigDecimal;

/**
 * Strategy interface for payment gateways.
 *
 * <p>To add a new payment provider, simply create a @Component that implements
 * this interface and returns the provider name from {@link #provider()}.
 * The {@link PaymentGatewayFactory} will auto-discover it — no other changes needed.
 *
 * <p>Example:
 * <pre>{@code
 * @Component
 * public class StripeGateway implements PaymentGateway {
 *     @Override public String provider() { return "stripe"; }
 *     // ... implement methods
 * }
 * }</pre>
 */
public interface PaymentGateway {

    /**
     * Creates a payment in the external gateway.
     *
     * @param request the payment parameters (amount, method, customer, items, etc.)
     * @return the gateway response containing QR code, boleto URL, preference ID, etc.
     */
    PaymentResponse createPayment(PaymentRequest request);

    /**
     * Queries the current status of a payment in the gateway.
     *
     * @param externalId the gateway's own payment identifier
     * @return the current {@link PaymentStatus}
     */
    PaymentStatus getStatus(String externalId);

    /**
     * Issues a (full or partial) refund for an approved payment.
     *
     * @param externalId the gateway's payment identifier
     * @param amount     the amount to refund; must be ≤ original payment amount
     * @return refund confirmation details
     */
    RefundResponse refund(String externalId, BigDecimal amount);

    /**
     * Validates and processes an incoming webhook notification from the gateway.
     *
     * <p>Implementations MUST validate the {@code signature} (HMAC or equivalent)
     * before trusting the {@code payload}.
     *
     * @param payload   raw request body as a string
     * @param signature the gateway-provided signature header value
     * @throws com.mutum.patadeveludo.exception.WebhookSignatureException if signature is invalid
     */
    void processWebhook(String payload, String signature);

    /**
     * Returns the canonical provider identifier used as the map key in
     * {@link PaymentGatewayFactory}.
     *
     * <p>Use lowercase kebab-case: "mercadopago", "stripe", "pagarme", etc.
     *
     * @return unique, stable provider name string
     */
    String provider();
}
