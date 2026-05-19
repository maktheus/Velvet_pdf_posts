package com.mutum.patadeveludo.controller;

import com.mutum.patadeveludo.dto.response.ProductResponse;
import com.mutum.patadeveludo.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Public product catalog endpoints")
public class ProductController {

    private final ProductService productService;

    /**
     * Returns a paginated list of active products. Optionally filter by category.
     */
    @GetMapping
    @Operation(summary = "List products", description = "Returns paginated active products, optionally filtered by category")
    public ResponseEntity<Page<ProductResponse>> listProducts(
            @RequestParam(required = false) String cat,
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(productService.findAll(cat, pageable));
    }

    /**
     * Returns a single product by ID.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable String id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    /**
     * Full-text search across product name and tagline.
     */
    @GetMapping("/search")
    @Operation(summary = "Search products", description = "Search active products by name or tagline")
    public ResponseEntity<List<ProductResponse>> searchProducts(
            @RequestParam String q) {
        return ResponseEntity.ok(productService.search(q));
    }
}
