package com.mutum.patadeveludo.service.payment.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class PaymentResponse {

    /**
     * The payment ID assigned by the gateway (e.g. MercadoPago payment id).
     */
    private String externalId;

    /**
     * The gateway provider name: "mercadopago", "stripe", etc.
     */
    private String provider;

    /**
     * Unified payment status.
     */
    private PaymentStatus status;

    // --- PIX fields ---
    /**
     * Copy-paste PIX key (EMV QR Code string).
     */
    private String pixQrCode;

    /**
     * Base64-encoded PIX QR Code image (PNG).
     */
    private String pixQrCodeBase64;

    // --- Boleto fields ---
    private String boletoUrl;
    private String boletoBarcode;

    // --- Credit card / Checkout Pro fields ---
    /**
     * MercadoPago Preference ID for JS checkout.
     */
    private String preferenceId;

    /**
     * When this payment expires (Pix: 30 min, Boleto: 3 days).
     */
    private LocalDateTime expiresAt;

    /**
     * Confirmed payment amount.
     */
    private BigDecimal amount;

    /**
     * Human-readable message (e.g., approval reason or rejection reason).
     */
    private String message;
}
