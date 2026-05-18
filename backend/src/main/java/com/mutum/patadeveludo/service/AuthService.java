package com.mutum.patadeveludo.service;

import com.mutum.patadeveludo.dto.request.LoginRequest;
import com.mutum.patadeveludo.dto.request.RegisterRequest;
import com.mutum.patadeveludo.dto.response.CustomerResponse;
import com.mutum.patadeveludo.model.Customer;
import com.mutum.patadeveludo.repository.CustomerRepository;
import com.mutum.patadeveludo.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    /**
     * Registers a new customer account.
     *
     * @return a map containing the JWT token and customer info
     */
    @Transactional
    public Map<String, Object> register(RegisterRequest request) {
        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado: " + request.getEmail());
        }
        if (request.getCpf() != null && customerRepository.existsByCpf(request.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }

        Customer customer = Customer.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .cpf(request.getCpf())
                .role(Customer.Role.CUSTOMER)
                .build();

        customer = customerRepository.save(customer);
        log.info("New customer registered: {}", customer.getEmail());

        String token = tokenProvider.generateToken(customer);
        return Map.of(
                "token", token,
                "customer", CustomerResponse.from(customer)
        );
    }

    /**
     * Authenticates a customer and returns a JWT token.
     *
     * @return a map containing the JWT token and customer info
     */
    @Transactional(readOnly = true)
    public Map<String, Object> login(LoginRequest request) {
        Customer customer = customerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Email ou senha incorretos"));

        if (!customer.isActive()) {
            throw new BadCredentialsException("Conta desativada");
        }

        if (!passwordEncoder.matches(request.getPassword(), customer.getPasswordHash())) {
            throw new BadCredentialsException("Email ou senha incorretos");
        }

        String token = tokenProvider.generateToken(customer);
        log.info("Customer logged in: {}", customer.getEmail());

        return Map.of(
                "token", token,
                "customer", CustomerResponse.from(customer)
        );
    }
}
