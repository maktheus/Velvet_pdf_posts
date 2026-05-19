package com.mutum.patadeveludo.dto.response;

import com.mutum.patadeveludo.model.Product;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ProductResponse {

    private String id;
    private String name;
    private String tagline;
    private String story;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private String categoryId;
    private String categoryName;
    private String colorways;
    private String tag;
    private String specs;
    private String images;
    private boolean active;
    private int stockQty;
    private String sku;
    private LocalDateTime createdAt;

    public static ProductResponse from(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .tagline(product.getTagline())
                .story(product.getStory())
                .price(product.getPrice())
                .originalPrice(product.getOriginalPrice())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .colorways(product.getColorways())
                .tag(product.getTag())
                .specs(product.getSpecs())
                .images(product.getImages())
                .active(product.isActive())
                .stockQty(product.getStockQty())
                .sku(product.getSku())
                .createdAt(product.getCreatedAt())
                .build();
    }
}
