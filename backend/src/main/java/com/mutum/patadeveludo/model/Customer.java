package com.mutum.patadeveludo.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

    public enum Role {
        CUSTOMER, ADMIN
    }

    public enum Tier {
        VELUDO,  // base tier
        OURO,    // gold tier
        PANTERA  // premium tier
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String phone;

    @Column(unique = true)
    private String cpf;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.CUSTOMER;

    @Column(name = "loyalty_points")
    @Builder.Default
    private int loyaltyPoints = 0;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Tier tier = Tier.VELUDO;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "customer_addresses",
            joinColumns = @JoinColumn(name = "customer_id"))
    @Builder.Default
    private List<Address> addresses = new ArrayList<>();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<CustomerCat> cats = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
