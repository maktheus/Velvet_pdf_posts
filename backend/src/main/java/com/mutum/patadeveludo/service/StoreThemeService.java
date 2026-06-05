package com.mutum.patadeveludo.service;

import com.mutum.patadeveludo.dto.request.ThemeUpdateRequest;
import com.mutum.patadeveludo.dto.response.ThemeResponse;
import com.mutum.patadeveludo.model.StoreTheme;
import com.mutum.patadeveludo.repository.StoreThemeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreThemeService {

    private static final String SINGLETON_ID = "00000000-0000-0000-0000-000000000001";

    private final StoreThemeRepository themeRepository;

    @Cacheable(value = "theme", key = "'current'")
    @Transactional(readOnly = true)
    public ThemeResponse getTheme() {
        StoreTheme theme = themeRepository.findById(SINGLETON_ID)
            .orElseGet(this::createDefault);
        return ThemeResponse.from(theme);
    }

    @CacheEvict(value = "theme", key = "'current'")
    @Transactional
    public ThemeResponse updateTheme(ThemeUpdateRequest req) {
        StoreTheme theme = themeRepository.findById(SINGLETON_ID)
            .orElseGet(this::createDefault);

        if (req.getColorBackground() != null) theme.setColorBackground(req.getColorBackground());
        if (req.getColorPrimary()    != null) theme.setColorPrimary(req.getColorPrimary());
        if (req.getColorDark()       != null) theme.setColorDark(req.getColorDark());
        if (req.getColorMedium()     != null) theme.setColorMedium(req.getColorMedium());
        if (req.getColorAccent()     != null) theme.setColorAccent(req.getColorAccent());
        if (req.getFontHeading()     != null) theme.setFontHeading(req.getFontHeading());
        if (req.getFontBody()        != null) theme.setFontBody(req.getFontBody());
        if (req.getFontScale()       != null) theme.setFontScale(req.getFontScale());
        if (req.getLogoUrl()         != null) theme.setLogoUrl(req.getLogoUrl());
        if (req.getBannerUrl()       != null) theme.setBannerUrl(req.getBannerUrl());
        if (req.getStoreName()       != null) theme.setStoreName(req.getStoreName());
        if (req.getStoreHandle()     != null) theme.setStoreHandle(req.getStoreHandle());
        if (req.getStoreTagline()    != null) theme.setStoreTagline(req.getStoreTagline());
        if (req.getHeroStyle()       != null) theme.setHeroStyle(req.getHeroStyle());

        StoreTheme saved = themeRepository.save(theme);
        log.info("Theme updated by admin");
        return ThemeResponse.from(saved);
    }

    private StoreTheme createDefault() {
        StoreTheme theme = StoreTheme.builder().id(SINGLETON_ID).build();
        return themeRepository.save(theme);
    }
}
