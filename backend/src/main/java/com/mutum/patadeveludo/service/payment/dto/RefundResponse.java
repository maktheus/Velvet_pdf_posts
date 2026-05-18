package com.mutum.patadeveludo.service.payment.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class RefundResponse {

    /**
     * Refund ID from the gateway.
     */
    private String refundId;

    /**
     * Original payment external ID.
     */
    private String externalId;

    /**
     * Provider name.
     */
    private String provider;

    /**
     * Refund status: usually REFUNDED or PENDING (async refunds).
     */
    private PaymentStatus status;

    /**
     * Amount that was refunded.
     */
    private BigDecimal refundedAmount;

    /**
     * When the refund was created.
     */
    private LocalDateTime refundedAt;

    /**
     * Human-readable message.
     */
    private String message;
}
