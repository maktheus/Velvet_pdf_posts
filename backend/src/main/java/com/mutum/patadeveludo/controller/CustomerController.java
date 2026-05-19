package com.mutum.patadeveludo.controller;

import com.mutum.patadeveludo.dto.response.CustomerResponse;
import com.mutum.patadeveludo.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers/me")
@RequiredArgsConstructor
@Tag(name = "Customer Profile", description = "Authenticated customer profile endpoints")
@SecurityRequirement(name = "bearerAuth")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    @Operation(summary = "Get my profile")
    public ResponseEntity<CustomerResponse> getMe(@AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(customerService.findById(principal.getUsername()));
    }

    @PatchMapping
    @Operation(summary = "Update my profile")
    public ResponseEntity<CustomerResponse> updateMe(
            @AuthenticationPrincipal UserDetails principal,
            @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(customerService.updateProfile(
                principal.getUsername(),
                request.getFirstName(),
                request.getLastName(),
                request.getPhone()
        ));
    }

    @Data
    static class UpdateProfileRequest {
        private String firstName;
        private String lastName;
        private String phone;
    }
}
