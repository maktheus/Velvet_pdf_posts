package com.mutum.patadeveludo.controller;

import com.mutum.patadeveludo.model.Category;
import com.mutum.patadeveludo.repository.CategoryRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Categories", description = "Product category endpoints")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping
    @Operation(summary = "List all active categories")
    public ResponseEntity<List<Category>> listCategories() {
        return ResponseEntity.ok(
                categoryRepository.findByActiveTrueOrderBySortOrderAsc());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get category by ID")
    public ResponseEntity<Category> getCategory(@PathVariable String id) {
        return ResponseEntity.ok(
                categoryRepository.findById(id)
                        .filter(Category::isActive)
                        .orElseThrow(() -> new EntityNotFoundException(
                                "Categoria não encontrada: " + id)));
    }
}
