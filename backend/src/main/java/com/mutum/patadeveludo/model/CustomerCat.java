package com.mutum.patadeveludo.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "customer_cats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerCat {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer owner;

    @Column(nullable = false)
    private String name;

    private String breed;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "photo_url")
    private String photoUrl;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
