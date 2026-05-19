package com.mutum.patadeveludo.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class DashboardResponse {

    // Revenue
    private BigDecimal revenueToday;
    private BigDecimal revenueThisMonth;
    private BigDecimal revenueAllTime;

    // Orders
    private long ordersTotalToday;
    private long ordersPending;
    private long ordersPaid;
    private long ordersShipped;
    private long ordersDelivered;
    private long ordersCancelled;

    // Customers
    private long totalCustomers;
    private long newCustomersThisMonth;

    // Products
    private long totalActiveProducts;
    private long lowStockProducts;

    // Top products
    private List<TopProductEntry> topProducts;

    @Data
    @Builder
    public static class TopProductEntry {
        private String productId;
        private String productName;
        private long unitsSold;
        private BigDecimal revenue;
    }
}
