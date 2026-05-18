package com.mutum.patadeveludo.controller.admin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/analytics")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Admin - Analytics", description = "Admin analytics and reporting endpoints")
@SecurityRequirement(name = "bearerAuth")
public class AdminAnalyticsController {

    /**
     * Returns revenue aggregated by day for the given date range.
     * Implementation connects to the order repository; currently returns stub structure.
     */
    @GetMapping("/revenue")
    @Operation(summary = "Revenue over time", description = "Daily revenue totals for a date range")
    public ResponseEntity<List<RevenuePoint>> getRevenueSeries(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        // TODO: query SUM(total) GROUP BY DATE(created_at) between from and to
        return ResponseEntity.ok(List.of(
                RevenuePoint.builder().date(from).revenue(BigDecimal.ZERO).orderCount(0).build()
        ));
    }

    /**
     * Returns the top-selling products by units sold in the given period.
     */
    @GetMapping("/top-products")
    @Operation(summary = "Top products by sales")
    public ResponseEntity<List<TopProductStats>> getTopProducts(
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        // TODO: query JOIN order_items GROUP BY product_id ORDER BY SUM(quantity) DESC LIMIT :limit
        return ResponseEntity.ok(List.of());
    }

    /**
     * Returns order status breakdown for the period.
     */
    @GetMapping("/orders-by-status")
    @Operation(summary = "Order count grouped by status")
    public ResponseEntity<Map<String, Long>> getOrdersByStatus(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        // TODO: query COUNT(*) GROUP BY status
        return ResponseEntity.ok(Map.of());
    }

    /**
     * Returns new customer registrations aggregated by day.
     */
    @GetMapping("/new-customers")
    @Operation(summary = "New customer registrations over time")
    public ResponseEntity<List<CustomerPoint>> getNewCustomers(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        // TODO: query COUNT(*) GROUP BY DATE(created_at)
        return ResponseEntity.ok(List.of());
    }

    // -------------------------------------------------------------------------
    // Response DTOs
    // -------------------------------------------------------------------------

    @Data
    @Builder
    public static class RevenuePoint {
        private LocalDate date;
        private BigDecimal revenue;
        private long orderCount;
    }

    @Data
    @Builder
    public static class TopProductStats {
        private String productId;
        private String productName;
        private long unitsSold;
        private BigDecimal totalRevenue;
    }

    @Data
    @Builder
    public static class CustomerPoint {
        private LocalDate date;
        private long newCustomers;
    }
}
