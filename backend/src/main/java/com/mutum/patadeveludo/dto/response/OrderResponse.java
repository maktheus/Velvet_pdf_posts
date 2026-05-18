package com.mutum.patadeveludo.dto.response;

import com.mutum.patadeveludo.model.Address;
import com.mutum.patadeveludo.model.Order;
import com.mutum.patadeveludo.model.OrderItem;
import com.mutum.patadeveludo.model.OrderStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderResponse {

    private String id;
    private String customerId;
    private String customerEmail;
    private OrderStatus status;
    private BigDecimal subtotal;
    private BigDecimal shippingCost;
    private BigDecimal discount;
    private BigDecimal total;
    private String paymentProvider;
    private String paymentMethod;
    private String paymentExternalId;
    private Address shippingAddress;
    private String trackingCode;
    private String shippingCarrier;
    private String couponCode;
    private List<OrderItemResponse> items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static OrderResponse from(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .customerId(order.getCustomer() != null ? order.getCustomer().getId() : null)
                .customerEmail(order.getCustomer() != null ? order.getCustomer().getEmail() : null)
                .status(order.getStatus())
                .subtotal(order.getSubtotal())
                .shippingCost(order.getShippingCost())
                .discount(order.getDiscount())
                .total(order.getTotal())
                .paymentProvider(order.getPaymentProvider())
                .paymentMethod(order.getPaymentMethod())
                .paymentExternalId(order.getPaymentExternalId())
                .shippingAddress(order.getShippingAddress())
                .trackingCode(order.getTrackingCode())
                .shippingCarrier(order.getShippingCarrier())
                .couponCode(order.getCouponCode())
                .items(order.getItems() != null
                        ? order.getItems().stream().map(OrderItemResponse::from).toList()
                        : List.of())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }

    @Data
    @Builder
    public static class OrderItemResponse {
        private String id;
        private String productId;
        private String productName;
        private int quantity;
        private BigDecimal unitPrice;
        private BigDecimal totalPrice;
        private String colorway;

        public static OrderItemResponse from(OrderItem item) {
            return OrderItemResponse.builder()
                    .id(item.getId())
                    .productId(item.getProduct() != null ? item.getProduct().getId() : null)
                    .productName(item.getProductNameSnapshot())
                    .quantity(item.getQuantity())
                    .unitPrice(item.getUnitPrice())
                    .totalPrice(item.getTotalPrice())
                    .colorway(item.getColorwaySnapshot())
                    .build();
        }
    }
}
