package com.mutum.patadeveludo.repository;

import com.mutum.patadeveludo.model.Payment;
import com.mutum.patadeveludo.service.payment.dto.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {

    Optional<Payment> findByExternalId(String externalId);

    Optional<Payment> findByOrderId(String orderId);

    boolean existsByExternalId(String externalId);
}
