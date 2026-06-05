package com.mutum.patadeveludo.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "analytics_events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_type", nullable = false, length = 50)
    private String eventType;

    @Column(name = "session_id")
    private String sessionId;

    @Column(name = "product_id")
    private String productId;

    @Column(name = "page_path", length = 500)
    private String pagePath;

    @Column(name = "referrer", length = 500)
    private String referrer;

    @Column(name = "ip_hash", length = 64)
    private String ipHash;

    @Column(name = "revenue", precision = 10, scale = 2)
    private BigDecimal revenue;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
