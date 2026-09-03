package com.dental.sunrise.controller;

import com.dental.sunrise.dto.dashboard.DashboardResponse;
import com.dental.sunrise.service.DashboardService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService
    ) {
        this.dashboardService = dashboardService;
    }

    // =====================================================
    // GET DASHBOARD SUMMARY
    // GET /api/dashboard
    // =====================================================

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboardSummary() {

        DashboardResponse response =
                dashboardService.getDashboardSummary();

        return ResponseEntity.ok(response);
    }
}