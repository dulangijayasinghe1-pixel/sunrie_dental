package com.dental.sunrise.controller;

import com.dental.sunrise.dto.dentist.DentistRequest;
import com.dental.sunrise.dto.dentist.DentistResponse;
import com.dental.sunrise.dto.dentist.DentistSearchResponse;
import com.dental.sunrise.service.DentistService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dentists")
public class DentistController {

    private final DentistService dentistService;

    public DentistController(DentistService dentistService) {
        this.dentistService = dentistService;
    }

    // =========================================================
    // CREATE DENTIST
    // POST /api/dentists
    // =========================================================

    @PostMapping
    public ResponseEntity<DentistResponse> createDentist(
            @Valid @RequestBody DentistRequest request
    ) {

        DentistResponse response =
                dentistService.createDentist(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // =========================================================
    // GET DENTIST BY ID
    // GET /api/dentists/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<DentistResponse> getDentistById(
            @PathVariable Long id
    ) {

        DentistResponse response =
                dentistService.getDentistById(id);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET ALL DENTISTS
    // GET /api/dentists
    // =========================================================

    @GetMapping
    public ResponseEntity<List<DentistResponse>> getAllDentists() {

        List<DentistResponse> response =
                dentistService.getAllDentists();

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // UPDATE DENTIST
    // PUT /api/dentists/{id}
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<DentistResponse> updateDentist(
            @PathVariable Long id,
            @Valid @RequestBody DentistRequest request
    ) {

        DentistResponse response =
                dentistService.updateDentist(id, request);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // DELETE DENTIST
    // DELETE /api/dentists/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDentist(
            @PathVariable Long id
    ) {

        dentistService.deleteDentist(id);

        return ResponseEntity.noContent().build();
    }

    // =========================================================
    // SEARCH DENTISTS
    // GET /api/dentists/search?keyword=John
    // =========================================================

    @GetMapping("/search")
    public ResponseEntity<List<DentistSearchResponse>> searchDentists(
            @RequestParam String keyword
    ) {

        List<DentistSearchResponse> response =
                dentistService.searchDentists(keyword);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET ACTIVE DENTISTS
    // GET /api/dentists/active
    // =========================================================

    @GetMapping("/active")
    public ResponseEntity<List<DentistResponse>> getActiveDentists() {

        List<DentistResponse> response =
                dentistService.getActiveDentists();

        return ResponseEntity.ok(response);
    }
}