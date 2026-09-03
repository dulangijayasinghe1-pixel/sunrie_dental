package com.dental.sunrise.controller;

import com.dental.sunrise.dto.patient.PatientRequest;
import com.dental.sunrise.dto.patient.PatientResponse;
import com.dental.sunrise.dto.patient.PatientSearchResponse;
import com.dental.sunrise.service.PatientService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(
            PatientService patientService
    ) {
        this.patientService = patientService;
    }

    // =========================================================
    // CREATE PATIENT
    // =========================================================

    @PostMapping
    public ResponseEntity<PatientResponse> createPatient(
            @Valid @RequestBody PatientRequest request
    ) {

        PatientResponse response =
                patientService.createPatient(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // =========================================================
    // GET ALL PATIENTS
    // =========================================================

    @GetMapping
    public ResponseEntity<List<PatientResponse>> getAllPatients() {

        return ResponseEntity.ok(
                patientService.getAllPatients()
        );
    }

    // =========================================================
    // GET PATIENT BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponse> getPatientById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                patientService.getPatientById(id)
        );
    }

    // =========================================================
    // UPDATE PATIENT
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<PatientResponse> updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequest request
    ) {

        return ResponseEntity.ok(
                patientService.updatePatient(
                        id,
                        request
                )
        );
    }

    // =========================================================
    // DELETE PATIENT
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(
            @PathVariable Long id
    ) {

        patientService.deletePatient(id);

        return ResponseEntity.noContent().build();
    }

    // =========================================================
    // SEARCH PATIENTS
    // =========================================================

    @GetMapping("/search")
    public ResponseEntity<List<PatientSearchResponse>> searchPatients(
            @RequestParam String keyword
    ) {

        return ResponseEntity.ok(
                patientService.searchPatients(keyword)
        );
    }

    // =========================================================
    // GET PATIENT AGE
    // =========================================================

    @GetMapping("/{id}/age")
    public ResponseEntity<Integer> getPatientAge(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                patientService.getPatientAge(id)
        );
    }
}