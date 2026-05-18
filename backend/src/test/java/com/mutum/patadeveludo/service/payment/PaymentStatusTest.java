package com.mutum.patadeveludo.service.payment;

import com.mutum.patadeveludo.service.payment.dto.PaymentStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.assertj.core.api.Assertions.*;

class PaymentStatusTest {

    @ParameterizedTest(name = "MP status '{0}' → {1}")
    @CsvSource({
        "approved,       APPROVED",
        "pending,        PENDING",
        "rejected,       REJECTED",
        "refunded,       REFUNDED",
        "cancelled,      CANCELLED",
        "in_process,     IN_PROCESS",
        "authorized,     AUTHORIZED"
    })
    void fromMercadoPago_mapsAllKnownStatuses(String mpStatus, PaymentStatus expected) {
        assertThat(PaymentStatus.fromMercadoPago(mpStatus)).isEqualTo(expected);
    }

    @Test
    void fromMercadoPago_unknownStatus_returnsPending() {
        assertThat(PaymentStatus.fromMercadoPago("unknown_status"))
            .isEqualTo(PaymentStatus.PENDING);
    }

    @Test
    void fromMercadoPago_nullStatus_returnsPending() {
        assertThat(PaymentStatus.fromMercadoPago(null))
            .isEqualTo(PaymentStatus.PENDING);
    }
}
