package com.mutum.patadeveludo.service;

import com.mutum.patadeveludo.dto.response.ProductResponse;
import com.mutum.patadeveludo.model.Product;
import com.mutum.patadeveludo.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public Page<ProductResponse> findAll(String categoryId, Pageable pageable) {
        Page<Product> page = categoryId != null && !categoryId.isBlank()
                ? productRepository.findByCategoryIdAndActiveTrue(categoryId, pageable)
                : productRepository.findByActiveTrue(pageable);
        return page.map(ProductResponse::from);
    }

    @Transactional(readOnly = true)
    public ProductResponse findById(String id) {
        return productRepository.findById(id)
                .filter(Product::isActive)
                .map(ProductResponse::from)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado: " + id));
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> search(String query) {
        return productRepository.searchActive(query)
                .stream()
                .map(ProductResponse::from)
                .toList();
    }

    @Transactional
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public void deactivate(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado: " + id));
        product.setActive(false);
        productRepository.save(product);
    }
}
