package com.mutum.patadeveludo.repository;

import com.mutum.patadeveludo.model.Order;
import com.mutum.patadeveludo.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    Page<Order> findByCustomerId(String customerId, Pageable pageable);

    Page<Order> findByStatus(OrderStatus status, Pageable pageable);

    @Query("""
            SELECT o FROM Order o
            WHERE (:status IS NULL OR o.status = :status)
              AND (:from IS NULL OR o.createdAt >= :from)
              AND (:to IS NULL OR o.createdAt <= :to)
            ORDER BY o.createdAt DESC
            """)
    Page<Order> findByFilters(
            @Param("status") OrderStatus status,
            @Param("from") LocalDateTime from,
            @Param("to") LocalDateTime to,
            Pageable pageable);

    Optional<Order> findByPaymentExternalId(String paymentExternalId);

    @Query("""
            SELECT o FROM Order o
            JOIN FETCH o.customer
            JOIN FETCH o.items i
            JOIN FETCH i.product
            WHERE o.id = :id
            """)
    Optional<Order> findByIdWithDetails(@Param("id") String id);

    @Query("""
            SELECT COUNT(o) FROM Order o
            WHERE o.status = :status
              AND o.createdAt >= :since
            """)
    long countByStatusSince(@Param("status") OrderStatus status,
                            @Param("since") LocalDateTime since);
}
