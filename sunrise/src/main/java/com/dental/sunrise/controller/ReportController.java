package com.dental.sunrise.controller;

import com.dental.sunrise.dto.report.ReportResponse;
import com.dental.sunrise.service.ReportService;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(
            ReportService reportService
    ) {
        this.reportService = reportService;
    }

    // =========================================================
    // GENERATE REPORT
    // =========================================================

    @GetMapping
    public ResponseEntity<ReportResponse> generateReport(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate

    ) {

        ReportResponse report =
                reportService.generateReport(
                        startDate,
                        endDate
                );

        return ResponseEntity.ok(report);
    }
}