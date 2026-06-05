package com.mutum.patadeveludo.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "store_theme")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreTheme {

    @Id
    private String id;

    @Column(name = "color_background", nullable = false, length = 7)
    @Builder.Default private String colorBackground = "#F5EDD8";

    @Column(name = "color_primary", nullable = false, length = 7)
    @Builder.Default private String colorPrimary = "#C4826A";

    @Column(name = "color_dark", nullable = false, length = 7)
    @Builder.Default private String colorDark = "#2D1A0E";

    @Column(name = "color_medium", nullable = false, length = 7)
    @Builder.Default private String colorMedium = "#5A3A22";

    @Column(name = "color_accent", nullable = false, length = 7)
    @Builder.Default private String colorAccent = "#8FAF8F";

    @Column(name = "font_heading", nullable = false)
    @Builder.Default private String fontHeading = "Georgia";

    @Column(name = "font_body", nullable = false)
    @Builder.Default private String fontBody = "Inter";

    @Column(name = "font_scale", nullable = false, precision = 3, scale = 2)
    @Builder.Default private BigDecimal fontScale = BigDecimal.ONE;

    @Column(name = "logo_url", columnDefinition = "TEXT")
    private String logoUrl;

    @Column(name = "banner_url", columnDefinition = "TEXT")
    private String bannerUrl;

    @Column(name = "store_name", nullable = false)
    @Builder.Default private String storeName = "Pata de Veludo";

    @Column(name = "store_handle", nullable = false)
    @Builder.Default private String storeHandle = "@patadeveludo";

    @Column(name = "store_tagline", columnDefinition = "TEXT")
    private String storeTagline;

    @Column(name = "hero_style", nullable = false)
    @Builder.Default private String heroStyle = "gradient";

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
