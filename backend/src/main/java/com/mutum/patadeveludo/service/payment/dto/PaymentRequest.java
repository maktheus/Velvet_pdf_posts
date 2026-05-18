package com.mutum.patadeveludo.service.payment.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class PaymentRequest {

    private String orderId;

    /**
     * Payment amount in BRL.
     */
    private BigDecimal amount;

    /**
     * Currency code — default "BRL".
     */
    @Builder.Default
    private String currency = "BRL";

    /**
     * Payment method: "PIX", "CREDIT_CARD", "BOLETO".
     */
    private String method;

    private String customerEmail;

    /**
     * Customer CPF (Brazilian tax ID), digits only.
     */
    private String customerDocument;

    private String customerFirstName;
    private String customerLastName;
    private String customerPhone;

    private List<PaymentItem> items;

    private PaymentAddress billingAddress;

    /**
     * Number of installments for credit card payments (1–12).
     */
    @Builder.Default
    private int installments = 1;

    /**
     * Tokenized card from the frontend (MercadoPago.js card token).
     */
    private String cardToken;

    /**
     * Nested item DTO used to build the payment preference.
     */
    @Data
    @Builder
    public static class PaymentItem {
        private String id;
        private String title;
        private int quantity;
        private BigDecimal unitPrice;
    }

    /**
     * Billing address DTO.
     */
    @Data
    @Builder
    public static class PaymentAddress {
        private String zipCode;
        private String street;
        private String number;
        private String complement;
        private String neighborhood;
        private String city;
        private String state;
        private String country;
    }
}
