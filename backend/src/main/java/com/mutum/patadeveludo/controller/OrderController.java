package com.mutum.patadeveludo.controller;

import com.mutum.patadeveludo.dto.request.CreateOrderRequest;
import com.mutum.patadeveludo.dto.response.OrderResponse;
import com.mutum.patadeveludo.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Customer order management")
@SecurityRequirement(name = "bearerAuth")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @Operation(summary = "Create a new order")
    public ResponseEntity<OrderResponse> createOrder(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestBody CreateOrderRequest request) {
        String customerId = principal.getUsername(); // username = customerId (see UserDetailsServiceImpl)
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.createOrder(customerId, request));
    }

    @GetMapping
    @Operation(summary = "List my orders")
    public ResponseEntity<Page<OrderResponse>> listMyOrders(
            @AuthenticationPrincipal UserDetails principal,
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(
                orderService.findByCustomer(principal.getUsername(), pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get order by ID")
    public ResponseEntity<OrderResponse> getOrder(
            @AuthenticationPrincipal UserDetails principal,
            @PathVariable String id) {
        OrderResponse order = orderService.findById(id);
        // Customers can only see their own orders
        if (!order.getCustomerId().equals(principal.getUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(order);
    }
}
