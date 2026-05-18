package com.mutum.patadeveludo.security;

import com.mutum.patadeveludo.model.Customer;
import com.mutum.patadeveludo.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final CustomerRepository customerRepository;

    /**
     * Used by Spring Security's DaoAuthenticationProvider (login by email).
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Usuário não encontrado: " + email));
        return buildUserDetails(customer);
    }

    /**
     * Used by {@link JwtAuthFilter} to load user by ID from JWT subject claim.
     */
    @Transactional(readOnly = true)
    public UserDetails loadUserById(String id) throws UsernameNotFoundException {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Usuário não encontrado por ID: " + id));
        return buildUserDetails(customer);
    }

    private UserDetails buildUserDetails(Customer customer) {
        if (!customer.isActive()) {
            throw new UsernameNotFoundException("Conta desativada: " + customer.getEmail());
        }
        var authority = new SimpleGrantedAuthority("ROLE_" + customer.getRole().name());
        return new User(customer.getId(), customer.getPasswordHash(), List.of(authority));
    }
}
