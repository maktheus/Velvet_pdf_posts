package com.mutum.patadeveludo.repository;

import com.mutum.patadeveludo.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    Page<Product> findByActiveTrue(Pageable pageable);

    Page<Product> findByCategoryIdAndActiveTrue(String categoryId, Pageable pageable);

    @Query("""
            SELECT p FROM Product p
            WHERE p.active = true
              AND (LOWER(p.name) LIKE LOWER(CONCAT('%', :q, '%'))
                OR LOWER(p.tagline) LIKE LOWER(CONCAT('%', :q, '%')))
            """)
    List<Product> searchActive(@Param("q") String query);

    boolean existsBySku(String sku);
}
