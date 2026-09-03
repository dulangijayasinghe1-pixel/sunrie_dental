package com.dental.sunrise.service;

import com.dental.sunrise.dto.dentist.DentistRequest;
import com.dental.sunrise.dto.dentist.DentistResponse;
import com.dental.sunrise.dto.dentist.DentistSearchResponse;
import com.dental.sunrise.entity.Dentist;
import com.dental.sunrise.exception.DuplicateResourceException;
import com.dental.sunrise.exception.ResourceNotFoundException;
import com.dental.sunrise.repository.DentistRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DentistService {

    private final DentistRepository dentistRepository;

    public DentistService(DentistRepository dentistRepository) {
        this.dentistRepository = dentistRepository;
    }

    // =========================================================
    // CREATE DENTIST
    // =========================================================

    public DentistResponse createDentist(DentistRequest request) {

        if (dentistRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException(
                    "Dentist email is already registered."
            );
        }

        Dentist dentist = Dentist.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .specialization(request.getSpecialization())
                .registrationNumber(request.getRegistrationNumber())
                .active(true)
                .build();

        Dentist savedDentist = dentistRepository.save(dentist);

        return mapToResponse(savedDentist);
    }

    // =========================================================
    // GET DENTIST BY ID
    // =========================================================

    public DentistResponse getDentistById(Long id) {

        Dentist dentist = dentistRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Dentist not found with ID: " + id
                        )
                );

        return mapToResponse(dentist);
    }

    // =========================================================
    // GET ALL DENTISTS
    // =========================================================

    public List<DentistResponse> getAllDentists() {

        return dentistRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // =========================================================
    // UPDATE DENTIST
    // =========================================================

    public DentistResponse updateDentist(
            Long id,
            DentistRequest request
    ) {

        Dentist dentist = dentistRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Dentist not found with ID: " + id
                        )
                );

        // Check email belongs to another dentist
        if (!dentist.getEmail().equalsIgnoreCase(request.getEmail())
                && dentistRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException(
                    "Dentist email is already registered."
            );
        }

        dentist.setName(request.getName());
        dentist.setEmail(request.getEmail());
        dentist.setPhone(request.getPhone());
        dentist.setSpecialization(
                request.getSpecialization()
        );
        dentist.setRegistrationNumber(
                request.getRegistrationNumber()
        );

        Dentist updatedDentist =
                dentistRepository.save(dentist);

        return mapToResponse(updatedDentist);
    }

    // =========================================================
    // DELETE DENTIST
    // =========================================================

    public void deleteDentist(Long id) {

        Dentist dentist = dentistRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Dentist not found with ID: " + id
                        )
                );

        dentistRepository.delete(dentist);
    }

    // =========================================================
    // SEARCH DENTISTS
    // =========================================================

    public List<DentistSearchResponse> searchDentists(
            String keyword
    ) {

        return dentistRepository
                .findByNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::mapToSearchResponse)
                .toList();
    }

    // =========================================================
    // GET ACTIVE DENTISTS
    // =========================================================

    public List<DentistResponse> getActiveDentists() {

        return dentistRepository
                .findByActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // =========================================================
    // ENTITY → DENTIST RESPONSE
    // =========================================================

    private DentistResponse mapToResponse(
            Dentist dentist
    ) {

        return DentistResponse.builder()
                .dentistId(dentist.getId())
                .name(dentist.getName())
                .email(dentist.getEmail())
                .phone(dentist.getPhone())
                .specialization(
                        dentist.getSpecialization()
                )
                .registrationNumber(
                        dentist.getRegistrationNumber()
                )
                .active(dentist.isActive())
                .build();
    }

    // =========================================================
    // ENTITY → SEARCH RESPONSE
    // =========================================================

    private DentistSearchResponse mapToSearchResponse(
            Dentist dentist
    ) {

        return DentistSearchResponse.builder()
                .dentistId(dentist.getId())
                .name(dentist.getName())
                .email(dentist.getEmail())
                .phone(dentist.getPhone())
                .specialization(
                        dentist.getSpecialization()
                )
                .active(dentist.isActive())
                .build();
    }
}