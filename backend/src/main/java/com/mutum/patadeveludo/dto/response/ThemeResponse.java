package com.mutum.patadeveludo.dto.response;

import com.mutum.patadeveludo.model.StoreTheme;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ThemeResponse {
    private String colorBackground;
    private String colorPrimary;
    private String colorDark;
    private String colorMedium;
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
    private LocalDateTime updatedAt;

    public static ThemeResponse from(StoreTheme t) {
        return ThemeResponse.builder()
            .colorBackground(t.getColorBackground())
            .colorPrimary(t.getColorPrimary())
            .colorDark(t.getColorDark())
            .colorMedium(t.getColorMedium())
            .colorAccent(t.getColorAccent())
            .fontHeading(t.getFontHeading())
            .fontBody(t.getFontBody())
            .fontScale(t.getFontScale())
            .logoUrl(t.getLogoUrl())
            .bannerUrl(t.getBannerUrl())
            .storeName(t.getStoreName())
            .storeHandle(t.getStoreHandle())
            .storeTagline(t.getStoreTagline())
            .heroStyle(t.getHeroStyle())
            .updatedAt(t.getUpdatedAt())
            .build();
    }
}
