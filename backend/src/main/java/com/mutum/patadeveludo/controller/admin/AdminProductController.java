package com.mutum.patadeveludo.controller.admin;

import com.mutum.patadeveludo.dto.response.ProductResponse;
import com.mutum.patadeveludo.model.Category;
import com.mutum.patadeveludo.model.Product;
import com.mutum.patadeveludo.repository.CategoryRepository;
import com.mutum.patadeveludo.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/admin/products")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Admin - Products", description = "Admin product management")
@SecurityRequirement(name = "bearerAuth")
public class AdminProductController {

    private final ProductService productService;
    private final CategoryRepository categoryRepository;

    @GetMapping
    @Operation(summary = "List all products (including inactive)")
    public ResponseEntity<Page<ProductResponse>> listAll(
            @PageableDefault(size = 20) Pageable pageable) {
        // Admin sees all products — we use the generic findAll bypassing active filter
        return ResponseEntity.ok(
                productService.findAll(null, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable String id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new product")
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @RequestBody ProductUpsertRequest request) {
        Product product = buildProduct(request, null);
        Product saved = productService.save(product);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ProductResponse.from(saved));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a product")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable String id,
            @Valid @RequestBody ProductUpsertRequest request) {
        Product product = buildProduct(request, id);
        Product saved = productService.save(product);
        return ResponseEntity.ok(ProductResponse.from(saved));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deactivate a product")
    public ResponseEntity<Void> deactivateProduct(@PathVariable String id) {
        productService.deactivate(id);
        return ResponseEntity.noContent().build();
    }

    private Product buildProduct(ProductUpsertRequest r, String existingId) {
        Category category = r.getCategoryId() != null
                ? categoryRepository.findById(r.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Categoria não encontrada: " + r.getCategoryId()))
                : null;

        return Product.builder()
                .id(existingId)
                .name(r.getName())
                .tagline(r.getTagline())
                .story(r.getStory())
                .price(r.getPrice())
                .originalPrice(r.getOriginalPrice())
                .category(category)
                .colorways(r.getColorways())
                .tag(r.getTag())
                .specs(r.getSpecs())
                .images(r.getImages())
                .active(r.isActive())
                .stockQty(r.getStockQty())
                .sku(r.getSku())
                .weight(r.getWeight())
                .build();
    }

    @Data
    public static class ProductUpsertRequest {
        @NotBlank private String name;
        private String tagline;
        private String story;
        @NotNull @Positive private BigDecimal price;
        private BigDecimal originalPrice;
        private String categoryId;
        private String colorways;
        private String tag;
        private String specs;
        private String images;
        private boolean active = true;
        private int stockQty;
        private String sku;
        private BigDecimal weight;
    }
}
