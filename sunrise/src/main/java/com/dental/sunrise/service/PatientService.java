package com.dental.sunrise.service;

import com.dental.sunrise.dto.patient.PatientRequest;
import com.dental.sunrise.dto.patient.PatientResponse;
import com.dental.sunrise.dto.patient.PatientSearchResponse;
import com.dental.sunrise.entity.Patient;
import com.dental.sunrise.repository.PatientRepository;
import com.dental.sunrise.validation.PatientValidator;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientValidator patientValidator;
    private final EmailService emailService;

    public PatientService(
            PatientRepository patientRepository,
            PatientValidator patientValidator,
            EmailService emailService
    ) {
        this.patientRepository = patientRepository;
        this.patientValidator = patientValidator;
        this.emailService = emailService;
    }

    // =====================================================
    // CREATE PATIENT
    // =====================================================

    public PatientResponse createPatient(
            PatientRequest request
    ) {

        Patient patient = Patient.builder()
                .name(request.getName())
                .dob(request.getDob())
                .gender(request.getGender())
                .phone(request.getPhone())
                .email(request.getEmail())
                .address(request.getAddress())
                .guardianName(request.getGuardianName())
                .guardianContact(request.getGuardianContact())
                .medicalHistory(null)
                .active(true)
                .build();

        patientValidator.validate(patient);

        Patient savedPatient =
                patientRepository.save(patient);

        // Send welcome email only if patient has an email
        if (savedPatient.getEmail() != null
                && !savedPatient.getEmail().isBlank()) {

            emailService.sendPatientWelcomeEmail(
                    savedPatient.getEmail(),
                    savedPatient.getName()
            );
        }

        return mapToResponse(savedPatient);
    }

    // =====================================================
    // GET PATIENT BY ID
    // =====================================================

    public PatientResponse getPatientById(Long id) {

        Patient patient = patientRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Patient not found with ID: " + id
                        )
                );

        return mapToResponse(patient);
    }

    // =====================================================
    // GET ALL PATIENTS
    // =====================================================

    public List<PatientResponse> getAllPatients() {

        return patientRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // =====================================================
    // UPDATE PATIENT
    // =====================================================

    public PatientResponse updatePatient(
            Long id,
            PatientRequest request
    ) {

        Patient patient = patientRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Patient not found with ID: " + id
                        )
                );

        patient.setName(request.getName());
        patient.setDob(request.getDob());
        patient.setGender(request.getGender());
        patient.setPhone(request.getPhone());
        patient.setEmail(request.getEmail());
        patient.setAddress(request.getAddress());
        patient.setGuardianName(request.getGuardianName());
        patient.setGuardianContact(request.getGuardianContact());

        patientValidator.validate(patient);

        Patient updatedPatient =
                patientRepository.save(patient);

        return mapToResponse(updatedPatient);
    }

    // =====================================================
    // DELETE PATIENT
    // =====================================================

    public void deletePatient(Long id) {

        Patient patient = patientRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Patient not found with ID: " + id
                        )
                );

        patientRepository.delete(patient);
    }

    // =====================================================
    // SEARCH PATIENTS
    // =====================================================

    public List<PatientSearchResponse> searchPatients(
            String keyword
    ) {

        if (keyword == null || keyword.isBlank()) {

            return patientRepository.findAll()
                    .stream()
                    .map(this::mapToSearchResponse)
                    .toList();
        }

        String searchKeyword = keyword.trim();

        List<Patient> patients =
                patientRepository
                        .findByNameContainingIgnoreCaseOrPhoneContaining(
                                searchKeyword,
                                searchKeyword
                        );

        return patients
                .stream()
                .map(this::mapToSearchResponse)
                .toList();
    }

    // =====================================================
    // GET PATIENT AGE
    // =====================================================

    public int getPatientAge(Long id) {

        Patient patient = patientRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Patient not found with ID: " + id
                        )
                );

        return patientValidator.calculateAge(
                patient.getDob()
        );
    }

    // =====================================================
    // ENTITY -> PATIENT RESPONSE
    // =====================================================

    private PatientResponse mapToResponse(
            Patient patient
    ) {

        int age = patientValidator.calculateAge(
                patient.getDob()
        );

        return PatientResponse.builder()
                .patientId(patient.getId())
                .name(patient.getName())
                .dob(patient.getDob() != null
                        ? patient.getDob().toString()
                        : null)
                .age(age)
                .gender(patient.getGender())
                .address(patient.getAddress())
                .phone(patient.getPhone())
                .email(patient.getEmail())
                .guardianName(patient.getGuardianName())
                .guardianContact(patient.getGuardianContact())
                .guardianEmail(null)
                .build();
    }

    // =====================================================
    // ENTITY -> SEARCH RESPONSE
    // =====================================================

    private PatientSearchResponse mapToSearchResponse(
            Patient patient
    ) {

        int age = patientValidator.calculateAge(
                patient.getDob()
        );

        return PatientSearchResponse.builder()
                .patientId(patient.getId())
                .name(patient.getName())
                .age(age)
                .gender(patient.getGender())
                .phone(patient.getPhone())
                .email(patient.getEmail())
                .build();
    }
}