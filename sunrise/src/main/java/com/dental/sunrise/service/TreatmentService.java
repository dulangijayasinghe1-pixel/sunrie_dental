package com.dental.sunrise.service;

import com.dental.sunrise.dto.treatment.TreatmentRequest;
import com.dental.sunrise.dto.treatment.TreatmentResponse;
import com.dental.sunrise.entity.Appointment;
import com.dental.sunrise.entity.Dentist;
import com.dental.sunrise.entity.Patient;
import com.dental.sunrise.entity.Treatment;
import com.dental.sunrise.repository.AppointmentRepository;
import com.dental.sunrise.repository.DentistRepository;
import com.dental.sunrise.repository.PatientRepository;
import com.dental.sunrise.repository.TreatmentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreatmentService {

    private final TreatmentRepository treatmentRepository;
    private final PatientRepository patientRepository;
    private final DentistRepository dentistRepository;
    private final AppointmentRepository appointmentRepository;

    public TreatmentService(
            TreatmentRepository treatmentRepository,
            PatientRepository patientRepository,
            DentistRepository dentistRepository,
            AppointmentRepository appointmentRepository
    ) {
        this.treatmentRepository = treatmentRepository;
        this.patientRepository = patientRepository;
        this.dentistRepository = dentistRepository;
        this.appointmentRepository = appointmentRepository;
    }

    // ==============================
    // CREATE TREATMENT
    // ==============================

    public TreatmentResponse createTreatment(
            TreatmentRequest request
    ) {

        Patient patient = patientRepository
                .findById(request.getPatientId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Patient not found with ID: "
                                        + request.getPatientId()
                        )
                );

        Dentist dentist = dentistRepository
                .findById(request.getDentistId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Dentist not found with ID: "
                                        + request.getDentistId()
                        )
                );

        Appointment appointment = null;

        if (request.getAppointmentId() != null) {

            appointment = appointmentRepository
                    .findById(request.getAppointmentId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "Appointment not found with ID: "
                                            + request.getAppointmentId()
                            )
                    );
        }

        Treatment.TreatmentStatus status =
                Treatment.TreatmentStatus.ONGOING;

        if (request.getStatus() != null
                && !request.getStatus().isBlank()) {

            status = Treatment.TreatmentStatus.valueOf(
                    request.getStatus().toUpperCase()
            );
        }

        Treatment treatment = Treatment.builder()
                .patient(patient)
                .dentist(dentist)
                .appointment(appointment)
                .treatmentName(request.getTreatmentName())
                .description(request.getDescription())
                .cost(request.getCost())
                .status(status)
                .build();

        Treatment savedTreatment =
                treatmentRepository.save(treatment);

        return mapToResponse(savedTreatment);
    }

    // ==============================
    // GET TREATMENT BY ID
    // ==============================

    public TreatmentResponse getTreatmentById(Long id) {

        Treatment treatment = treatmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Treatment not found with ID: " + id
                        )
                );

        return mapToResponse(treatment);
    }

    // ==============================
    // GET ALL TREATMENTS
    // ==============================

    public List<TreatmentResponse> getAllTreatments() {

        return treatmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ==============================
    // GET TREATMENTS BY PATIENT
    // ==============================

    public List<TreatmentResponse> getTreatmentsByPatient(
            Long patientId
    ) {

        if (!patientRepository.existsById(patientId)) {

            throw new IllegalArgumentException(
                    "Patient not found with ID: " + patientId
            );
        }

        return treatmentRepository
                .findByPatientIdOrderByTreatmentDateDesc(patientId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ==============================
    // GET TREATMENTS BY DENTIST
    // ==============================

    public List<TreatmentResponse> getTreatmentsByDentist(
            Long dentistId
    ) {

        if (!dentistRepository.existsById(dentistId)) {

            throw new IllegalArgumentException(
                    "Dentist not found with ID: " + dentistId
            );
        }

        return treatmentRepository
                .findByDentistIdOrderByTreatmentDateDesc(dentistId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ==============================
    // GET TREATMENTS BY APPOINTMENT
    // ==============================

    public List<TreatmentResponse> getTreatmentsByAppointment(
            Long appointmentId
    ) {

        if (!appointmentRepository.existsById(appointmentId)) {

            throw new IllegalArgumentException(
                    "Appointment not found with ID: " + appointmentId
            );
        }

        return treatmentRepository
                .findByAppointmentId(appointmentId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ==============================
    // UPDATE TREATMENT
    // ==============================

    public TreatmentResponse updateTreatment(
            Long id,
            TreatmentRequest request
    ) {

        Treatment treatment = treatmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Treatment not found with ID: " + id
                        )
                );

        Patient patient = patientRepository
                .findById(request.getPatientId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Patient not found with ID: "
                                        + request.getPatientId()
                        )
                );

        Dentist dentist = dentistRepository
                .findById(request.getDentistId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Dentist not found with ID: "
                                        + request.getDentistId()
                        )
                );

        Appointment appointment = null;

        if (request.getAppointmentId() != null) {

            appointment = appointmentRepository
                    .findById(request.getAppointmentId())
                    .orElseThrow(() ->
                            new IllegalArgumentException(
                                    "Appointment not found with ID: "
                                            + request.getAppointmentId()
                            )
                    );
        }

        treatment.setPatient(patient);
        treatment.setDentist(dentist);
        treatment.setAppointment(appointment);
        treatment.setTreatmentName(
                request.getTreatmentName()
        );
        treatment.setDescription(
                request.getDescription()
        );
        treatment.setCost(
                request.getCost()
        );

        if (request.getStatus() != null
                && !request.getStatus().isBlank()) {

            treatment.setStatus(
                    Treatment.TreatmentStatus.valueOf(
                            request.getStatus().toUpperCase()
                    )
            );
        }

        Treatment updatedTreatment =
                treatmentRepository.save(treatment);

        return mapToResponse(updatedTreatment);
    }

    // ==============================
    // DELETE TREATMENT
    // ==============================

    public void deleteTreatment(Long id) {

        Treatment treatment = treatmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Treatment not found with ID: " + id
                        )
                );

        treatmentRepository.delete(treatment);
    }

    // ==============================
    // ENTITY → RESPONSE
    // ==============================

    private TreatmentResponse mapToResponse(
            Treatment treatment
    ) {

        return TreatmentResponse.builder()

                .treatmentId(
                        treatment.getId()
                )

                .patientId(
                        treatment.getPatient().getId()
                )

                .patientName(
                        treatment.getPatient().getName()
                )

                .dentistId(
                        treatment.getDentist() != null
                                ? treatment.getDentist().getId()
                                : null
                )

                .dentistName(
                        treatment.getDentist() != null
                                ? treatment.getDentist().getName()
                                : null
                )

                .appointmentId(
                        treatment.getAppointment() != null
                                ? treatment.getAppointment().getId()
                                : null
                )

                .treatmentName(
                        treatment.getTreatmentName()
                )

                .description(
                        treatment.getDescription()
                )

                .cost(
                        treatment.getCost()
                )

                .status(
                        treatment.getStatus().name()
                )

                .treatmentDate(
                        treatment.getTreatmentDate()
                )

                .createdAt(
                        treatment.getCreatedAt()
                )

                .updatedAt(
                        treatment.getUpdatedAt()
                )

                .build();
    }
}