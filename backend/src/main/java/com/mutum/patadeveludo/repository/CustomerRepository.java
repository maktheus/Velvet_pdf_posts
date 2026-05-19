package com.mutum.patadeveludo.repository;

import com.mutum.patadeveludo.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

    Optional<Customer> findByEmail(String email);

    Optional<Customer> findByCpf(String cpf);

    boolean existsByEmail(String email);

    boolean existsByCpf(String cpf);
}
