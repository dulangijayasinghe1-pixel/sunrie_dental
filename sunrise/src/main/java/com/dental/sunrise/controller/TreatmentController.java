package com.dental.sunrise.controller;

import com.dental.sunrise.dto.treatment.TreatmentRequest;
import com.dental.sunrise.dto.treatment.TreatmentResponse;
import com.dental.sunrise.service.TreatmentService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/treatments")
public class TreatmentController {

    private final TreatmentService treatmentService;

    public TreatmentController(TreatmentService treatmentService) {
        this.treatmentService = treatmentService;
    }

    // =========================================================
    // CREATE TREATMENT
    // POST /api/treatments
    // =========================================================

    @PostMapping
    public ResponseEntity<TreatmentResponse> createTreatment(
            @Valid @RequestBody TreatmentRequest request
    ) {

        TreatmentResponse response =
                treatmentService.createTreatment(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // =========================================================
    // GET TREATMENT BY ID
    // GET /api/treatments/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<TreatmentResponse> getTreatmentById(
            @PathVariable Long id
    ) {

        TreatmentResponse response =
                treatmentService.getTreatmentById(id);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET ALL TREATMENTS
    // GET /api/treatments
    // =========================================================

    @GetMapping
    public ResponseEntity<List<TreatmentResponse>> getAllTreatments() {

        List<TreatmentResponse> response =
                treatmentService.getAllTreatments();

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET TREATMENTS BY PATIENT
    // GET /api/treatments/patient/{patientId}
    // =========================================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<TreatmentResponse>> getTreatmentsByPatient(
            @PathVariable Long patientId
    ) {

        List<TreatmentResponse> response =
                treatmentService.getTreatmentsByPatient(patientId);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET TREATMENTS BY DENTIST
    // GET /api/treatments/dentist/{dentistId}
    // =========================================================

    @GetMapping("/dentist/{dentistId}")
    public ResponseEntity<List<TreatmentResponse>> getTreatmentsByDentist(
            @PathVariable Long dentistId
    ) {

        List<TreatmentResponse> response =
                treatmentService.getTreatmentsByDentist(dentistId);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET TREATMENTS BY APPOINTMENT
    // GET /api/treatments/appointment/{appointmentId}
    // =========================================================

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<List<TreatmentResponse>> getTreatmentsByAppointment(
            @PathVariable Long appointmentId
    ) {

        List<TreatmentResponse> response =
                treatmentService.getTreatmentsByAppointment(
                        appointmentId
                );

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // UPDATE TREATMENT
    // PUT /api/treatments/{id}
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<TreatmentResponse> updateTreatment(
            @PathVariable Long id,
            @Valid @RequestBody TreatmentRequest request
    ) {

        TreatmentResponse response =
                treatmentService.updateTreatment(id, request);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // DELETE TREATMENT
    // DELETE /api/treatments/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTreatment(
            @PathVariable Long id
    ) {

        treatmentService.deleteTreatment(id);

        return ResponseEntity.noContent().build();
    }
}