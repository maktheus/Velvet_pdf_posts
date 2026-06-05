package com.mutum.patadeveludo.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ThemeUpdateRequest {

    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "Cor deve ser hex válido (#RRGGBB)")
    private String colorBackground;

    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$")
    private String colorPrimary;

    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$")
    private String colorDark;

    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$")
    private String colorMedium;

    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$")
    private String colorAccent;

    private String fontHeading;
    private String fontBody;
    private BigDecimal fontScale;
    private String logoUrl;
    private String bannerUrl;
    private String storeName;
    private String storeHandle;
    private String storeTagline;
    private String heroStyle;
}
