package com.mutum.patadeveludo.controller;

import com.mutum.patadeveludo.dto.request.TrackEventRequest;
import com.mutum.patadeveludo.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@Tag(name = "Analytics", description = "Client-side event tracking")
public class AnalyticsEventController {

    private final AnalyticsService analyticsService;

    @PostMapping("/event")
    @Operation(summary = "Track an analytics event (public)")
    public ResponseEntity<Void> track(
            @Valid @RequestBody TrackEventRequest req,
            HttpServletRequest httpReq) {
        analyticsService.track(req, httpReq);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
