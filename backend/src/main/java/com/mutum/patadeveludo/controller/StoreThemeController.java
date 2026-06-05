package com.mutum.patadeveludo.controller;

import com.mutum.patadeveludo.dto.request.ThemeUpdateRequest;
import com.mutum.patadeveludo.dto.response.ThemeResponse;
import com.mutum.patadeveludo.service.StoreThemeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "Store Theme", description = "Store visual theme endpoints")
public class StoreThemeController {

    private final StoreThemeService themeService;

    @GetMapping("/api/store/theme")
    @Operation(summary = "Get current store theme (public)")
    public ResponseEntity<ThemeResponse> getTheme() {
        return ResponseEntity.ok(themeService.getTheme());
    }

    @PutMapping("/api/admin/theme")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update store theme (admin only)")
    public ResponseEntity<ThemeResponse> updateTheme(@Valid @RequestBody ThemeUpdateRequest req) {
        return ResponseEntity.ok(themeService.updateTheme(req));
    }
}
