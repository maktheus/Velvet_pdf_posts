package com.mutum.patadeveludo.service.payment;

import com.mutum.patadeveludo.exception.UnsupportedGatewayException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

class PaymentGatewayFactoryTest {

    private PaymentGatewayFactory factory;

    // Stub gateway for testing
    static class StubGateway implements PaymentGateway {
        private final String name;
        StubGateway(String name) { this.name = name; }
        @Override public String provider() { return name; }
        @Override public PaymentResponse createPayment(PaymentRequest r) { return null; }
        @Override public PaymentStatus getStatus(String id) { return null; }
        @Override public RefundResponse refund(String id, BigDecimal amount) { return null; }
        @Override public void processWebhook(String payload, String signature) {}
    }

    @BeforeEach
    void setUp() {
        factory = new PaymentGatewayFactory(List.of(
            new StubGateway("mercadopago"),
            new StubGateway("stripe")
        ));
    }

    @Test
    void returnsCorrectGateway_forKnownProvider() {
        PaymentGateway gw = factory.get("mercadopago");
        assertThat(gw.provider()).isEqualTo("mercadopago");
    }

    @Test
    void returnsStripeGateway_whenRequested() {
        PaymentGateway gw = factory.get("stripe");
        assertThat(gw.provider()).isEqualTo("stripe");
    }

    @Test
    void throwsUnsupportedGatewayException_forUnknownProvider() {
        assertThatThrownBy(() -> factory.get("paypal"))
            .isInstanceOf(UnsupportedGatewayException.class)
            .hasMessageContaining("paypal");
    }

    @Test
    void availableProviders_containsAllRegistered() {
        assertThat(factory.availableProviders())
            .containsExactlyInAnyOrder("mercadopago", "stripe");
    }

    @Test
    void newGateway_registeredWithoutCodeChange() {
        // Adding a new gateway requires only a new @Component — no factory changes
        var extended = new PaymentGatewayFactory(List.of(
            new StubGateway("mercadopago"),
            new StubGateway("stripe"),
            new StubGateway("pagarme")
        ));
        assertThat(extended.availableProviders()).hasSize(3);
        assertThat(extended.get("pagarme").provider()).isEqualTo("pagarme");
    }
}
