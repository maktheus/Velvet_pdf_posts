package com.mutum.patadeveludo.service.payment.mercadopago;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotBlank;

@Component
@ConfigurationProperties(prefix = "mercadopago")
@Data
@Validated
public class MercadoPagoProperties {

    @NotBlank(message = "mercadopago.access-token must be configured")
    private String accessToken;

    @NotBlank(message = "mercadopago.webhook-secret must be configured")
    private String webhookSecret;

    private String notificationUrl = "https://api.patadeveludo.com.br/api/payments/webhook";
}
