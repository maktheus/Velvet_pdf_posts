package com.mutum.patadeveludo.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Component
@ConfigurationProperties(prefix = "jwt")
@Data
@Validated
public class JwtConfig {

    @NotBlank(message = "jwt.secret must be configured")
    private String secret;

    /**
     * Token validity for regular customers (default 24h = 86400000ms).
     */
    @Positive
    private long expirationMs = 86_400_000L;

    /**
     * Token validity for admin users (default 2h = 7200000ms).
     */
    @Positive
    private long adminExpirationMs = 7_200_000L;
}
