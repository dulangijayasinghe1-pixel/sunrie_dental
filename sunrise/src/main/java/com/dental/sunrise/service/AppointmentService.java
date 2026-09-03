package com.dental.sunrise.service;

import com.dental.sunrise.dto.appointment.AppointmentRequest;
import com.dental.sunrise.dto.appointment.AppointmentResponse;
import com.dental.sunrise.dto.appointment.CancelAppointmentRequest;
import com.dental.sunrise.dto.appointment.RescheduleAppointmentRequest;
import com.dental.sunrise.entity.Appointment;
import com.dental.sunrise.entity.Dentist;
import com.dental.sunrise.entity.Patient;
import com.dental.sunrise.exception.AppointmentConflictException;
import com.dental.sunrise.repository.AppointmentRepository;
import com.dental.sunrise.repository.DentistRepository;
import com.dental.sunrise.repository.PatientRepository;
import com.dental.sunrise.validation.AppointmentValidator;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DentistRepository dentistRepository;
    private final AppointmentValidator appointmentValidator;
    private final EmailService emailService;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DentistRepository dentistRepository,
            AppointmentValidator appointmentValidator,
            EmailService emailService
    ) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.dentistRepository = dentistRepository;
        this.appointmentValidator = appointmentValidator;
        this.emailService = emailService;
    }

    // ==============================
    // CREATE APPOINTMENT
    // ==============================

    public AppointmentResponse createAppointment(
            AppointmentRequest request
    ) {

        appointmentValidator.validateAppointment(
                request.getPatientId(),
                request.getDentistId(),
                request.getAppointmentDateTime()
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
                .findByIdAndActiveTrue(request.getDentistId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Active dentist not found with ID: "
                                        + request.getDentistId()
                        )
                );

        checkDentistConflict(
                request.getDentistId(),
                request.getAppointmentDateTime(),
                null
        );

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .dentist(dentist)
                .appointmentDateTime(request.getAppointmentDateTime())
                .reason(request.getReason())
                .status(Appointment.AppointmentStatus.SCHEDULED)
                .build();

        Appointment savedAppointment =
                appointmentRepository.save(appointment);

        // ==============================
        // SEND APPOINTMENT EMAIL
        // ==============================

        if (patient.getEmail() != null
                && !patient.getEmail().isBlank()) {

            emailService.sendAppointmentConfirmationEmail(
                    patient.getEmail(),
                    patient.getName(),
                    savedAppointment
                            .getAppointmentDateTime()
                            .toString(),
                    dentist.getName()
            );
        }

        return mapToResponse(savedAppointment);
    }

    // ==============================
    // GET APPOINTMENT BY ID
    // ==============================

    public AppointmentResponse getAppointmentById(Long id) {

        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Appointment not found with ID: " + id
                        )
                );

        return mapToResponse(appointment);
    }

    // ==============================
    // GET ALL APPOINTMENTS
    // ==============================

    public List<AppointmentResponse> getAllAppointments() {

        return appointmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ==============================
    // GET PATIENT APPOINTMENTS
    // ==============================

    public List<AppointmentResponse> getAppointmentsByPatient(
            Long patientId
    ) {

        if (!patientRepository.existsById(patientId)) {
            throw new IllegalArgumentException(
                    "Patient not found with ID: " + patientId
            );
        }

        return appointmentRepository
                .findByPatientIdOrderByAppointmentDateTimeDesc(patientId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ==============================
    // GET DENTIST APPOINTMENTS
    // ==============================

    public List<AppointmentResponse> getAppointmentsByDentist(
            Long dentistId
    ) {

        if (!dentistRepository.existsById(dentistId)) {
            throw new IllegalArgumentException(
                    "Dentist not found with ID: " + dentistId
            );
        }

        return appointmentRepository
                .findByDentistIdOrderByAppointmentDateTimeAsc(dentistId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ==============================
    // GET UPCOMING APPOINTMENTS
    // ==============================

    public List<AppointmentResponse> getUpcomingAppointments() {

        return appointmentRepository
                .findByAppointmentDateTimeAfter(LocalDateTime.now())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ==============================
    // GET APPOINTMENTS BY STATUS
    // ==============================

    public List<AppointmentResponse> getAppointmentsByStatus(
            Appointment.AppointmentStatus status
    ) {

        return appointmentRepository
                .findByStatus(status)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // ==============================
    // RESCHEDULE APPOINTMENT
    // ==============================

    public AppointmentResponse rescheduleAppointment(
            Long id,
            RescheduleAppointmentRequest request
    ) {

        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Appointment not found with ID: " + id
                        )
                );

        appointmentValidator.validateDateTime(
                request.getNewAppointmentDateTime()
        );

        if (appointment.getStatus()
                == Appointment.AppointmentStatus.CANCELLED) {

            throw new IllegalArgumentException(
                    "Cancelled appointment cannot be rescheduled."
            );
        }

        if (appointment.getStatus()
                == Appointment.AppointmentStatus.COMPLETED) {

            throw new IllegalArgumentException(
                    "Completed appointment cannot be rescheduled."
            );
        }

        checkDentistConflict(
                appointment.getDentist().getId(),
                request.getNewAppointmentDateTime(),
                id
        );

        appointment.setAppointmentDateTime(
                request.getNewAppointmentDateTime()
        );

        appointment.setStatus(
                Appointment.AppointmentStatus.RESCHEDULED
        );

        if (request.getReason() != null &&
                !request.getReason().isBlank()) {

            appointment.setReason(request.getReason());
        }

        Appointment updatedAppointment =
                appointmentRepository.save(appointment);

        // ==============================
        // SEND RESCHEDULE EMAIL
        // ==============================

        Patient patient = updatedAppointment.getPatient();
        Dentist dentist = updatedAppointment.getDentist();

        if (patient != null
                && patient.getEmail() != null
                && !patient.getEmail().isBlank()) {

            emailService.sendAppointmentRescheduledEmail(
                    patient.getEmail(),
                    patient.getName(),
                    updatedAppointment
                            .getAppointmentDateTime()
                            .toString(),
                    dentist.getName()
            );
        }

        return mapToResponse(updatedAppointment);
    }

    // ==============================
    // CANCEL APPOINTMENT
    // ==============================

    public AppointmentResponse cancelAppointment(
            Long id,
            CancelAppointmentRequest request
    ) {

        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Appointment not found with ID: " + id
                        )
                );

        if (appointment.getStatus()
                == Appointment.AppointmentStatus.CANCELLED) {

            throw new IllegalArgumentException(
                    "Appointment is already cancelled."
            );
        }

        if (appointment.getStatus()
                == Appointment.AppointmentStatus.COMPLETED) {

            throw new IllegalArgumentException(
                    "Completed appointment cannot be cancelled."
            );
        }

        appointment.setStatus(
                Appointment.AppointmentStatus.CANCELLED
        );

        appointment.setReason(request.getReason());

        Appointment cancelledAppointment =
                appointmentRepository.save(appointment);

        // ==============================
        // SEND CANCELLATION EMAIL
        // ==============================

        Patient patient = cancelledAppointment.getPatient();

        if (patient != null
                && patient.getEmail() != null
                && !patient.getEmail().isBlank()) {

            emailService.sendAppointmentCancelledEmail(
                    patient.getEmail(),
                    patient.getName(),
                    cancelledAppointment
                            .getAppointmentDateTime()
                            .toString()
            );
        }

        return mapToResponse(cancelledAppointment);
    }

    // ==============================
    // COMPLETE APPOINTMENT
    // ==============================

    public AppointmentResponse completeAppointment(Long id) {

        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Appointment not found with ID: " + id
                        )
                );

        if (appointment.getStatus()
                == Appointment.AppointmentStatus.CANCELLED) {

            throw new IllegalArgumentException(
                    "Cancelled appointment cannot be completed."
            );
        }

        appointment.setStatus(
                Appointment.AppointmentStatus.COMPLETED
        );

        Appointment completedAppointment =
                appointmentRepository.save(appointment);

        return mapToResponse(completedAppointment);
    }

    // ==============================
    // DELETE APPOINTMENT
    // ==============================

    public void deleteAppointment(Long id) {

        Appointment appointment = appointmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Appointment not found with ID: " + id
                        )
                );

        appointmentRepository.delete(appointment);
    }

    // ==============================
    // CHECK DENTIST CONFLICT
    // ==============================

    private void checkDentistConflict(
            Long dentistId,
            LocalDateTime appointmentDateTime,
            Long currentAppointmentId
    ) {

        List<Appointment> dentistAppointments =
                appointmentRepository
                        .findByDentistIdOrderByAppointmentDateTimeAsc(
                                dentistId
                        );

        boolean conflict = dentistAppointments
                .stream()
                .anyMatch(appointment -> {

                    if (currentAppointmentId != null &&
                            appointment.getId()
                                    .equals(currentAppointmentId)) {
                        return false;
                    }

                    if (appointment.getStatus()
                            == Appointment.AppointmentStatus.CANCELLED) {
                        return false;
                    }

                    return appointment.getAppointmentDateTime()
                            .equals(appointmentDateTime);
                });

        if (conflict) {
            throw new AppointmentConflictException(
                    "Dentist already has an appointment at this date and time."
            );
        }
    }

    // ==============================
    // ENTITY → RESPONSE DTO
    // ==============================

    private AppointmentResponse mapToResponse(
            Appointment appointment
    ) {

        return AppointmentResponse.builder()
                .appointmentId(appointment.getId())

                .patientId(
                        appointment.getPatient().getId()
                )

                .patientName(
                        appointment.getPatient().getName()
                )

                .dentistId(
                        appointment.getDentist().getId()
                )

                .dentistName(
                        appointment.getDentist().getName()
                )

                .appointmentDateTime(
                        appointment.getAppointmentDateTime()
                )

                .status(
                        appointment.getStatus().name()
                )

                .reason(
                        appointment.getReason()
                )

                .build();
    }
}