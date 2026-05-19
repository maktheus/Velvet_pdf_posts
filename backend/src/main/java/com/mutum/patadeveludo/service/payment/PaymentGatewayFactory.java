package com.mutum.patadeveludo.service.payment;

import com.mutum.patadeveludo.exception.UnsupportedGatewayException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Factory that auto-discovers all {@link PaymentGateway} implementations registered
 * as Spring beans and routes payment calls to the appropriate provider.
 *
 * <p>Adding a new gateway requires ZERO changes to this class — simply create a new
 * {@code @Component} that implements {@link PaymentGateway}.
 */
@Service
@Slf4j
public class PaymentGatewayFactory {

    private final Map<String, PaymentGateway> gateways;

    /**
     * Spring injects all {@link PaymentGateway} beans into this list automatically.
     * The map is keyed by {@link PaymentGateway#provider()}.
     */
    public PaymentGatewayFactory(List<PaymentGateway> all) {
        this.gateways = all.stream()
                .collect(Collectors.toMap(PaymentGateway::provider, Function.identity()));
        log.info("PaymentGatewayFactory initialized with {} provider(s): {}",
                gateways.size(), gateways.keySet());
    }

    /**
     * Retrieves the gateway for the given provider name.
     *
     * @param provider lowercase provider name, e.g. "mercadopago"
     * @return the matching {@link PaymentGateway}
     * @throws UnsupportedGatewayException if no bean is registered for that provider
     */
    public PaymentGateway get(String provider) {
        return Optional.ofNullable(gateways.get(provider))
                .orElseThrow(() -> new UnsupportedGatewayException(
                        "Gateway não suportado: " + provider +
                        ". Disponíveis: " + gateways.keySet()));
    }

    /**
     * Returns the set of registered provider names.
     *
     * @return unmodifiable set of provider names
     */
    public Set<String> availableProviders() {
        return gateways.keySet();
    }
}
