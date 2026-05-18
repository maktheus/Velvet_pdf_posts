package com.mutum.patadeveludo.controller.admin;

import com.mutum.patadeveludo.dto.response.OrderResponse;
import com.mutum.patadeveludo.model.OrderStatus;
import com.mutum.patadeveludo.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/admin/orders")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Admin - Orders", description = "Admin order management")
@SecurityRequirement(name = "bearerAuth")
public class AdminOrderController {

    private final OrderService orderService;

    /**
     * List all orders with optional filters for status and date range.
     */
    @GetMapping
    @Operation(summary = "List all orders")
    public ResponseEntity<Page<OrderResponse>> listOrders(
            @RequestParam(required = false) OrderStatus status,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to,
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(orderService.findAllAdmin(status, from, to, pageable));
    }

    /**
     * Get full order detail with customer, items, and payment info.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get order detail")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable String id) {
        return ResponseEntity.ok(orderService.findById(id));
    }

    /**
     * Updates the status of an order.
     */
    @PatchMapping("/{id}/status")
    @Operation(summary = "Update order status")
    public ResponseEntity<OrderResponse> updateStatus(
            @PathVariable String id,
            @RequestBody UpdateStatusRequest request) {
        return ResponseEntity.ok(orderService.updateStatus(id, request.getStatus()));
    }

    /**
     * Ships an order: sets status to SHIPPED and records tracking info.
     */
    @PostMapping("/{id}/ship")
    @Operation(summary = "Ship order", description = "Marks the order as shipped and stores tracking info")
    public ResponseEntity<OrderResponse> shipOrder(
            @PathVariable String id,
            @RequestBody ShipOrderRequest request) {
        return ResponseEntity.ok(
                orderService.ship(id, request.getCarrier(), request.getTrackingCode()));
    }

    /**
     * Cancels an order and optionally triggers a refund.
     */
    @PostMapping("/{id}/cancel")
    @Operation(summary = "Cancel order")
    public ResponseEntity<OrderResponse> cancelOrder(
            @PathVariable String id,
            @RequestBody CancelOrderRequest request) {
        // TODO: if request.isRefund(), call paymentService.refund(order.getPaymentExternalId(), order.getTotal())
        return ResponseEntity.ok(orderService.cancel(id, request.getReason()));
    }

    /**
     * Exports all orders (matching current filters) as CSV.
     */
    @GetMapping("/export")
    @Operation(summary = "Export orders as CSV")
    public ResponseEntity<byte[]> exportCsv(
            @RequestParam(required = false) OrderStatus status,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to) {

        // Fetch all matching orders (no pagination for export)
        var orders = orderService.findAllAdmin(status, from, to,
                Pageable.unpaged());

        StringBuilder csv = new StringBuilder();
        csv.append("id,customerId,customerEmail,status,total,paymentMethod,paymentProvider,createdAt\n");
        orders.forEach(o -> csv.append(String.join(",",
                nvl(o.getId()),
                nvl(o.getCustomerId()),
                nvl(o.getCustomerEmail()),
                nvl(o.getStatus() != null ? o.getStatus().name() : null),
                nvl(o.getTotal() != null ? o.getTotal().toPlainString() : null),
                nvl(o.getPaymentMethod()),
                nvl(o.getPaymentProvider()),
                nvl(o.getCreatedAt() != null ? o.getCreatedAt().toString() : null)
        )).append("\n"));

        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"orders.csv\"")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(bytes);
    }

    private String nvl(String v) {
        return v != null ? v : "";
    }

    // -------------------------------------------------------------------------
    // Request DTOs
    // -------------------------------------------------------------------------

    @Data
    public static class UpdateStatusRequest {
        private OrderStatus status;
    }

    @Data
    public static class ShipOrderRequest {
        private String carrier;
        private String trackingCode;
        private boolean notifyCustomer;
    }

    @Data
    public static class CancelOrderRequest {
        private String reason;
        private boolean refund;
    }
}
