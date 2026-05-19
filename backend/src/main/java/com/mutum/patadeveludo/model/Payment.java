package com.mutum.patadeveludo.model;

import com.mutum.patadeveludo.service.payment.dto.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @Column(name = "external_id")
    private String externalId;

    @Column(nullable = false)
    private String provider;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private PaymentStatus status = PaymentStatus.PENDING;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "currency", length = 3)
    @Builder.Default
    private String currency = "BRL";

    // PIX specific fields
    @Column(name = "pix_qr_code", columnDefinition = "TEXT")
    private String pixQrCode;

    @Column(name = "pix_qr_code_base64", columnDefinition = "TEXT")
    private String pixQrCodeBase64;

    // Boleto specific fields
    @Column(name = "boleto_url")
    private String boletoUrl;

    @Column(name = "boleto_barcode")
    private String boletoBarcode;

    // Card specific fields
    @Column(name = "preference_id")
    private String preferenceId;

    @Column(name = "installments")
    private Integer installments;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "raw_response", columnDefinition = "TEXT")
    private String rawResponse;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
