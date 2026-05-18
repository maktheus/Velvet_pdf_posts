package com.mutum.patadeveludo.service.payment.dto;

/**
 * Unified payment status across all gateways.
 */
public enum PaymentStatus {
    PENDING,
    APPROVED,
    REJECTED,
    REFUNDED,
    CANCELLED,
    IN_PROCESS,
    AUTHORIZED;

    /**
     * Maps MercadoPago status strings to our unified enum.
     *
     * @param mpStatus the raw status string from MercadoPago API
     * @return the corresponding PaymentStatus
     */
    public static PaymentStatus fromMercadoPago(String mpStatus) {
        if (mpStatus == null) return PENDING;
        return switch (mpStatus.toLowerCase()) {
            case "approved"         -> APPROVED;
            case "authorized"       -> AUTHORIZED;
            case "in_process",
                 "in_mediation",
                 "pending"          -> IN_PROCESS;
            case "rejected"         -> REJECTED;
            case "cancelled"        -> CANCELLED;
            case "refunded",
                 "charged_back"     -> REFUNDED;
            default                 -> PENDING;
        };
    }
}
