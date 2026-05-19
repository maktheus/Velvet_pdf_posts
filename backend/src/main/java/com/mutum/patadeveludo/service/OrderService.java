package com.mutum.patadeveludo.service;

import com.mutum.patadeveludo.dto.request.CreateOrderRequest;
import com.mutum.patadeveludo.dto.response.OrderResponse;
import com.mutum.patadeveludo.model.*;
import com.mutum.patadeveludo.repository.CustomerRepository;
import com.mutum.patadeveludo.repository.OrderRepository;
import com.mutum.patadeveludo.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    @Transactional
    public OrderResponse createOrder(String customerId, CreateOrderRequest request) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado: " + customerId));

        Order order = Order.builder()
                .customer(customer)
                .status(OrderStatus.PENDING)
                .paymentMethod(request.getPaymentMethod())
                .paymentProvider(request.getPaymentProvider())
                .couponCode(request.getCouponCode())
                .build();

        // Build shipping address
        if (request.getShippingAddress() != null) {
            var a = request.getShippingAddress();
            order.setShippingAddress(Address.builder()
                    .street(a.getStreet())
                    .number(a.getNumber())
                    .complement(a.getComplement())
                    .neighborhood(a.getNeighborhood())
                    .city(a.getCity())
                    .state(a.getState())
                    .zipCode(a.getZipCode())
                    .country(a.getCountry())
                    .build());
        }

        // Add items
        BigDecimal subtotal = BigDecimal.ZERO;
        for (CreateOrderRequest.OrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .filter(Product::isActive)
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Produto não encontrado: " + itemReq.getProductId()));

            if (product.getStockQty() < itemReq.getQuantity()) {
                throw new IllegalArgumentException(
                        "Estoque insuficiente para: " + product.getName());
            }

            BigDecimal unitPrice = product.getPrice();
            OrderItem item = OrderItem.builder()
                    .product(product)
                    .quantity(itemReq.getQuantity())
                    .unitPrice(unitPrice)
                    .totalPrice(unitPrice.multiply(BigDecimal.valueOf(itemReq.getQuantity())))
                    .productNameSnapshot(product.getName())
                    .colorwaySnapshot(itemReq.getColorway())
                    .build();

            order.addItem(item);
            subtotal = subtotal.add(item.getTotalPrice());

            // Decrement stock
            product.setStockQty(product.getStockQty() - itemReq.getQuantity());
            productRepository.save(product);
        }

        // TODO: apply coupon discount, calculate shipping (integrate with Correios/Melhor Envio)
        BigDecimal shippingCost = BigDecimal.ZERO;
        BigDecimal discount     = BigDecimal.ZERO;

        order.setSubtotal(subtotal);
        order.setShippingCost(shippingCost);
        order.setDiscount(discount);
        order.setTotal(subtotal.add(shippingCost).subtract(discount));

        Order saved = orderRepository.save(order);
        log.info("Order created: id={}, customer={}, total={}", saved.getId(), customerId, saved.getTotal());
        return OrderResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public Page<OrderResponse> findByCustomer(String customerId, Pageable pageable) {
        return orderRepository.findByCustomerId(customerId, pageable)
                .map(OrderResponse::from);
    }

    @Transactional(readOnly = true)
    public OrderResponse findById(String id) {
        return orderRepository.findByIdWithDetails(id)
                .map(OrderResponse::from)
                .orElseThrow(() -> new EntityNotFoundException("Pedido não encontrado: " + id));
    }

    @Transactional
    public OrderResponse updateStatus(String id, OrderStatus newStatus) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido não encontrado: " + id));
        order.setStatus(newStatus);
        return OrderResponse.from(orderRepository.save(order));
    }

    @Transactional
    public OrderResponse ship(String id, String carrier, String trackingCode) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido não encontrado: " + id));
        order.setStatus(OrderStatus.SHIPPED);
        order.setShippingCarrier(carrier);
        order.setTrackingCode(trackingCode);
        return OrderResponse.from(orderRepository.save(order));
    }

    @Transactional
    public OrderResponse cancel(String id, String reason) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido não encontrado: " + id));
        order.setStatus(OrderStatus.CANCELLED);
        order.setNotes(reason);
        return OrderResponse.from(orderRepository.save(order));
    }

    @Transactional(readOnly = true)
    public Page<OrderResponse> findAllAdmin(OrderStatus status,
                                            LocalDateTime from,
                                            LocalDateTime to,
                                            Pageable pageable) {
        return orderRepository.findByFilters(status, from, to, pageable)
                .map(OrderResponse::from);
    }
}
