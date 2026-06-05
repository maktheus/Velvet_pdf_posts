package com.mutum.patadeveludo.service;

import com.mutum.patadeveludo.dto.request.TrackEventRequest;
import com.mutum.patadeveludo.model.AnalyticsEvent;
import com.mutum.patadeveludo.repository.AnalyticsEventRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyticsService {

    private final AnalyticsEventRepository analyticsEventRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    @Async
    @Transactional
    public void track(TrackEventRequest req, HttpServletRequest httpReq) {
        String ipHash = hashIp(httpReq.getRemoteAddr());
        String today  = LocalDate.now().format(DateTimeFormatter.ISO_DATE);

        AnalyticsEvent event = AnalyticsEvent.builder()
            .eventType(req.getEventType())
            .sessionId(req.getSessionId())
            .productId(req.getProductId())
            .pagePath(req.getPagePath())
            .referrer(req.getReferrer())
            .ipHash(ipHash)
            .revenue(req.getRevenue())
            .build();
        analyticsEventRepository.save(event);

        // Increment Redis counters (fast, used by dashboard)
        String baseKey = "analytics:" + today;
        redisTemplate.opsForValue().increment(baseKey + ":pageviews");
        redisTemplate.expire(baseKey + ":pageviews", Duration.ofHours(25));

        if ("ORDER_COMPLETE".equals(req.getEventType()) && req.getRevenue() != null) {
            redisTemplate.opsForValue().increment(baseKey + ":orders");
            redisTemplate.expire(baseKey + ":orders", Duration.ofHours(25));
            // Store revenue as cents to avoid float issues
            long revCents = req.getRevenue().multiply(BigDecimal.valueOf(100)).longValue();
            redisTemplate.opsForValue().increment(baseKey + ":revenue_cents", revCents);
            redisTemplate.expire(baseKey + ":revenue_cents", Duration.ofHours(25));
        }
    }

    public Map<String, Object> getTodayStats() {
        String today = LocalDate.now().format(DateTimeFormatter.ISO_DATE);
        String base  = "analytics:" + today;

        Object pv  = redisTemplate.opsForValue().get(base + ":pageviews");
        Object ord = redisTemplate.opsForValue().get(base + ":orders");
        Object rev = redisTemplate.opsForValue().get(base + ":revenue_cents");

        long pageviews = pv  != null ? Long.parseLong(pv.toString())  : 0L;
        long orders    = ord != null ? Long.parseLong(ord.toString())  : 0L;
        BigDecimal revenue = rev != null
            ? BigDecimal.valueOf(Long.parseLong(rev.toString())).divide(BigDecimal.valueOf(100))
            : BigDecimal.ZERO;

        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("pageviews", pageviews);
        stats.put("orders",    orders);
        stats.put("revenue",   revenue);
        return stats;
    }

    public List<Map<String, Object>> getDailyStats(LocalDate from, LocalDate to) {
        LocalDateTime fromDt = from.atStartOfDay();
        LocalDateTime toDt   = to.plusDays(1).atStartOfDay();
        List<Object[]> rows  = analyticsEventRepository.dailyStats(fromDt, toDt);

        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] row : rows) {
            Map<String, Object> point = new LinkedHashMap<>();
            point.put("date",      row[0].toString());
            point.put("pageviews", row[1]);
            point.put("orders",    row[2]);
            point.put("revenue",   row[3]);
            result.add(point);
        }
        return result;
    }

    public List<Map<String, Object>> getTopProducts(LocalDate from, LocalDate to, int limit) {
        LocalDateTime fromDt = from.atStartOfDay();
        LocalDateTime toDt   = to.plusDays(1).atStartOfDay();
        List<Object[]> rows  = analyticsEventRepository.topViewedProducts(fromDt, toDt);

        return rows.stream().limit(limit).map(row -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("productId", row[0]);
            m.put("views",     row[1]);
            return m;
        }).toList();
    }

    private String hashIp(String ip) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] bytes = digest.digest(ip.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder();
            for (byte b : bytes) hex.append(String.format("%02x", b));
            return hex.toString();
        } catch (Exception e) {
            return "unknown";
        }
    }
}
