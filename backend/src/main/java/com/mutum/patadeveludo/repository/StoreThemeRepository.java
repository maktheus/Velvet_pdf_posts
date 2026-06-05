package com.mutum.patadeveludo.repository;

import com.mutum.patadeveludo.model.StoreTheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreThemeRepository extends JpaRepository<StoreTheme, String> {}
