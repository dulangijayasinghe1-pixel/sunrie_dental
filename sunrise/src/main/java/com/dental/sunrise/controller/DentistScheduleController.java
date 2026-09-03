package com.dental.sunrise.controller;

import com.dental.sunrise.dto.schedule.DentistScheduleRequest;
import com.dental.sunrise.dto.schedule.DentistScheduleResponse;
import com.dental.sunrise.service.DentistScheduleService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dentist-schedules")
public class DentistScheduleController {

    private final DentistScheduleService scheduleService;

    public DentistScheduleController(
            DentistScheduleService scheduleService
    ) {
        this.scheduleService = scheduleService;
    }

    // =========================================================
    // CREATE SCHEDULE
    // POST /api/dentist-schedules
    // =========================================================

    @PostMapping
    public ResponseEntity<DentistScheduleResponse> createSchedule(
            @Valid @RequestBody DentistScheduleRequest request
    ) {

        DentistScheduleResponse response =
                scheduleService.createSchedule(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // =========================================================
    // GET SCHEDULE BY ID
    // GET /api/dentist-schedules/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<DentistScheduleResponse> getScheduleById(
            @PathVariable Long id
    ) {

        DentistScheduleResponse response =
                scheduleService.getScheduleById(id);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET ALL SCHEDULES
    // GET /api/dentist-schedules
    // =========================================================

    @GetMapping
    public ResponseEntity<List<DentistScheduleResponse>> getAllSchedules() {

        List<DentistScheduleResponse> response =
                scheduleService.getAllSchedules();

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET SCHEDULES BY DENTIST
    // GET /api/dentist-schedules/dentist/{dentistId}
    // =========================================================

    @GetMapping("/dentist/{dentistId}")
    public ResponseEntity<List<DentistScheduleResponse>> getSchedulesByDentist(
            @PathVariable Long dentistId
    ) {

        List<DentistScheduleResponse> response =
                scheduleService.getSchedulesByDentist(dentistId);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // UPDATE SCHEDULE
    // PUT /api/dentist-schedules/{id}
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<DentistScheduleResponse> updateSchedule(
            @PathVariable Long id,
            @Valid @RequestBody DentistScheduleRequest request
    ) {

        DentistScheduleResponse response =
                scheduleService.updateSchedule(id, request);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // DELETE SCHEDULE
    // DELETE /api/dentist-schedules/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(
            @PathVariable Long id
    ) {

        scheduleService.deleteSchedule(id);

        return ResponseEntity.noContent().build();
    }

    // =========================================================
    // UPDATE AVAILABILITY
    // PATCH /api/dentist-schedules/{id}/availability
    // =========================================================

    @PatchMapping("/{id}/availability")
    public ResponseEntity<DentistScheduleResponse> updateAvailability(
            @PathVariable Long id,
            @RequestParam boolean available
    ) {

        DentistScheduleResponse response =
                scheduleService.updateAvailability(
                        id,
                        available
                );

        return ResponseEntity.ok(response);
    }
}