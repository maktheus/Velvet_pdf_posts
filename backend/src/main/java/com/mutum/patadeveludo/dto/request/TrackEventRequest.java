package com.mutum.patadeveludo.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class TrackEventRequest {

    @NotBlank
    @Pattern(regexp = "^(PAGE_VIEW|PRODUCT_VIEW|ADD_TO_CART|CHECKOUT_START|ORDER_COMPLETE)$",
             message = "Tipo de evento inválido")
    private String eventType;

    private String sessionId;
    private String productId;
    private String pagePath;
    private String referrer;
    private BigDecimal revenue;
}
