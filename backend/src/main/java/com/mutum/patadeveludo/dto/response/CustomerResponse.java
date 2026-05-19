package com.mutum.patadeveludo.dto.response;

import com.mutum.patadeveludo.model.Customer;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CustomerResponse {

    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private Customer.Role role;
    private Customer.Tier tier;
    private int loyaltyPoints;
    private boolean active;
    private LocalDateTime createdAt;

    public static CustomerResponse from(Customer customer) {
        return CustomerResponse.builder()
                .id(customer.getId())
                .email(customer.getEmail())
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .phone(customer.getPhone())
                .role(customer.getRole())
                .tier(customer.getTier())
                .loyaltyPoints(customer.getLoyaltyPoints())
                .active(customer.isActive())
                .createdAt(customer.getCreatedAt())
                .build();
    }
}
