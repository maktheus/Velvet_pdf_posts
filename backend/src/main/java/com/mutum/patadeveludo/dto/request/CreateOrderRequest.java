package com.mutum.patadeveludo.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CreateOrderRequest {

    @NotEmpty(message = "Pedido deve conter pelo menos um item")
    @Valid
    private List<OrderItemRequest> items;

    @Valid
    private ShippingAddressRequest shippingAddress;

    private String couponCode;

    @NotBlank(message = "Método de pagamento é obrigatório")
    private String paymentMethod;   // "PIX", "CREDIT_CARD", "BOLETO"

    @NotBlank(message = "Provedor de pagamento é obrigatório")
    private String paymentProvider; // "mercadopago"

    // Card-specific (optional)
    private String cardToken;
    private Integer installments;

    @Data
    public static class OrderItemRequest {
        @NotBlank
        private String productId;

        @Positive(message = "Quantidade deve ser maior que zero")
        private int quantity;

        private String colorway;
    }

    @Data
    public static class ShippingAddressRequest {
        @NotBlank private String zipCode;
        @NotBlank private String street;
        @NotBlank private String number;
        private String complement;
        @NotBlank private String neighborhood;
        @NotBlank private String city;
        @NotBlank private String state;
        private String country = "BR";
    }
}
