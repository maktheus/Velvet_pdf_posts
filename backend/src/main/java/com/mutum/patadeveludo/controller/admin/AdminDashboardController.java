package com.mutum.patadeveludo.controller.admin;

import com.mutum.patadeveludo.dto.response.DashboardResponse;
import com.mutum.patadeveludo.model.OrderStatus;
import com.mutum.patadeveludo.repository.CustomerRepository;
import com.mutum.patadeveludo.repository.OrderRepository;
import com.mutum.patadeveludo.repository.ProductRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;

@RestController
@RequestMapping("/api/admin/dashboard")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Admin - Dashboard", description = "Admin dashboard metrics")
@SecurityRequirement(name = "bearerAuth")
public class AdminDashboardController {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    @GetMapping
    @Operation(summary = "Get dashboard summary metrics")
    public ResponseEntity<DashboardResponse> getDashboard() {
        LocalDateTime now         = LocalDateTime.now();
        LocalDateTime startOfDay  = now.toLocalDate().atStartOfDay();
        LocalDateTime startOfMonth = now.with(TemporalAdjusters.firstDayOfMonth()).toLocalDate().atStartOfDay();

        long ordersPending   = orderRepository.countByStatusSince(OrderStatus.PENDING, startOfDay);
        long ordersPaid      = orderRepository.countByStatusSince(OrderStatus.PAID, startOfDay);
        long ordersShipped   = orderRepository.countByStatusSince(OrderStatus.SHIPPED, startOfMonth);
        long ordersDelivered = orderRepository.countByStatusSince(OrderStatus.DELIVERED, startOfMonth);
        long ordersCancelled = orderRepository.countByStatusSince(OrderStatus.CANCELLED, startOfMonth);

        DashboardResponse response = DashboardResponse.builder()
                // Revenue — these require dedicated @Query aggregations; using 0 as placeholder
                .revenueToday(BigDecimal.ZERO)
                .revenueThisMonth(BigDecimal.ZERO)
                .revenueAllTime(BigDecimal.ZERO)
                .ordersTotalToday(ordersPending + ordersPaid)
                .ordersPending(ordersPending)
                .ordersPaid(ordersPaid)
                .ordersShipped(ordersShipped)
                .ordersDelivered(ordersDelivered)
                .ordersCancelled(ordersCancelled)
                .totalCustomers(customerRepository.count())
                .newCustomersThisMonth(0L)    // requires a dedicated query
                .totalActiveProducts(productRepository.findByActiveTrue(
                        org.springframework.data.domain.Pageable.unpaged()).getTotalElements())
                .lowStockProducts(0L)         // requires a dedicated query
                .build();

        return ResponseEntity.ok(response);
    }
}
