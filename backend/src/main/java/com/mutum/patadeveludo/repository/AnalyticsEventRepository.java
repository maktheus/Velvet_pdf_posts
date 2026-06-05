package com.mutum.patadeveludo.repository;

import com.mutum.patadeveludo.model.AnalyticsEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AnalyticsEventRepository extends JpaRepository<AnalyticsEvent, Long> {

    long countByEventTypeAndCreatedAtBetween(String eventType, LocalDateTime from, LocalDateTime to);

    @Query("SELECT COALESCE(SUM(a.revenue), 0) FROM AnalyticsEvent a WHERE a.eventType = 'ORDER_COMPLETE' AND a.createdAt BETWEEN :from AND :to")
    BigDecimal sumRevenueBetween(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);

    @Query("SELECT a.productId, COUNT(a) as views FROM AnalyticsEvent a WHERE a.eventType = 'PRODUCT_VIEW' AND a.createdAt BETWEEN :from AND :to GROUP BY a.productId ORDER BY views DESC")
    List<Object[]> topViewedProducts(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);

    @Query("SELECT DATE(a.createdAt) as day, COUNT(a) as pageviews, " +
           "SUM(CASE WHEN a.eventType = 'ORDER_COMPLETE' THEN 1 ELSE 0 END) as orders, " +
           "COALESCE(SUM(CASE WHEN a.eventType = 'ORDER_COMPLETE' THEN a.revenue ELSE 0 END), 0) as revenue " +
           "FROM AnalyticsEvent a WHERE a.createdAt BETWEEN :from AND :to GROUP BY DATE(a.createdAt) ORDER BY day")
    List<Object[]> dailyStats(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);
}
