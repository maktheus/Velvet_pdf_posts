package com.mutum.patadeveludo.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Testcontainers
@ActiveProfiles("integration-test")
class PaymentControllerIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
        .withDatabaseName("patadeveludo_it")
        .withUsername("test")
        .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    MockMvc mockMvc;

    @Test
    void initPayment_unauthenticated_returns401() throws Exception {
        mockMvc.perform(post("/api/payments/init")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "orderId": "test-order",
                      "amount": 149.90,
                      "method": "PIX",
                      "customerEmail": "test@test.com"
                    }
                    """))
            .andExpect(status().isUnauthorized());
    }

    @Test
    void webhook_missingSignature_returns400() throws Exception {
        mockMvc.perform(post("/api/payments/webhook")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"action":"payment.updated","data":{"id":"123"}}
                    """))
            .andExpect(status().isBadRequest());
    }

    @Test
    void webhook_invalidSignature_returns401() throws Exception {
        mockMvc.perform(post("/api/payments/webhook")
                .contentType(MediaType.APPLICATION_JSON)
                .header("x-signature", "invalid-sig")
                .header("x-request-id", "test-req-id")
                .content("""
                    {"action":"payment.updated","data":{"id":"123"}}
                    """))
            .andExpect(status().isUnauthorized());
    }
}
