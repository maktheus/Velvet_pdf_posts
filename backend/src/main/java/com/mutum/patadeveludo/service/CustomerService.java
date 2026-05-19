package com.mutum.patadeveludo.service;

import com.mutum.patadeveludo.dto.response.CustomerResponse;
import com.mutum.patadeveludo.model.Customer;
import com.mutum.patadeveludo.repository.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Transactional(readOnly = true)
    public CustomerResponse findById(String id) {
        return customerRepository.findById(id)
                .map(CustomerResponse::from)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado: " + id));
    }

    @Transactional(readOnly = true)
    public CustomerResponse findByEmail(String email) {
        return customerRepository.findByEmail(email)
                .map(CustomerResponse::from)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado: " + email));
    }

    @Transactional
    public CustomerResponse updateProfile(String id, String firstName, String lastName, String phone) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado: " + id));

        if (firstName != null) customer.setFirstName(firstName);
        if (lastName  != null) customer.setLastName(lastName);
        if (phone     != null) customer.setPhone(phone);

        return CustomerResponse.from(customerRepository.save(customer));
    }

    @Transactional
    public void deactivate(String id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado: " + id));
        customer.setActive(false);
        customerRepository.save(customer);
    }
}
