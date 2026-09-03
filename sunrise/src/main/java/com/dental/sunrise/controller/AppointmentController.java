package com.dental.sunrise.controller;

import com.dental.sunrise.dto.appointment.AppointmentRequest;
import com.dental.sunrise.dto.appointment.AppointmentResponse;
import com.dental.sunrise.dto.appointment.CancelAppointmentRequest;
import com.dental.sunrise.dto.appointment.RescheduleAppointmentRequest;
import com.dental.sunrise.entity.Appointment;
import com.dental.sunrise.service.AppointmentService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentService appointmentService
    ) {
        this.appointmentService = appointmentService;
    }

    // =========================================================
    // CREATE APPOINTMENT
    // POST /api/appointments
    // =========================================================

    @PostMapping
    public ResponseEntity<AppointmentResponse> createAppointment(
            @Valid @RequestBody AppointmentRequest request
    ) {

        AppointmentResponse response =
                appointmentService.createAppointment(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // =========================================================
    // GET APPOINTMENT BY ID
    // GET /api/appointments/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> getAppointmentById(
            @PathVariable Long id
    ) {

        AppointmentResponse response =
                appointmentService.getAppointmentById(id);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET ALL APPOINTMENTS
    // GET /api/appointments
    // =========================================================

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {

        List<AppointmentResponse> response =
                appointmentService.getAllAppointments();

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET APPOINTMENTS BY PATIENT
    // GET /api/appointments/patient/{patientId}
    // =========================================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByPatient(
            @PathVariable Long patientId
    ) {

        List<AppointmentResponse> response =
                appointmentService.getAppointmentsByPatient(patientId);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET APPOINTMENTS BY DENTIST
    // GET /api/appointments/dentist/{dentistId}
    // =========================================================

    @GetMapping("/dentist/{dentistId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByDentist(
            @PathVariable Long dentistId
    ) {

        List<AppointmentResponse> response =
                appointmentService.getAppointmentsByDentist(dentistId);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET UPCOMING APPOINTMENTS
    // GET /api/appointments/upcoming
    // =========================================================

    @GetMapping("/upcoming")
    public ResponseEntity<List<AppointmentResponse>> getUpcomingAppointments() {

        List<AppointmentResponse> response =
                appointmentService.getUpcomingAppointments();

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET APPOINTMENTS BY STATUS
    // GET /api/appointments/status/{status}
    // =========================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByStatus(
            @PathVariable Appointment.AppointmentStatus status
    ) {

        List<AppointmentResponse> response =
                appointmentService.getAppointmentsByStatus(status);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // RESCHEDULE APPOINTMENT
    // PUT /api/appointments/{id}/reschedule
    // =========================================================

    @PutMapping("/{id}/reschedule")
    public ResponseEntity<AppointmentResponse> rescheduleAppointment(
            @PathVariable Long id,
            @Valid @RequestBody RescheduleAppointmentRequest request
    ) {

        AppointmentResponse response =
                appointmentService.rescheduleAppointment(id, request);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // CANCEL APPOINTMENT
    // PUT /api/appointments/{id}/cancel
    // =========================================================

    @PutMapping("/{id}/cancel")
    public ResponseEntity<AppointmentResponse> cancelAppointment(
            @PathVariable Long id,
            @Valid @RequestBody CancelAppointmentRequest request
    ) {

        AppointmentResponse response =
                appointmentService.cancelAppointment(id, request);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // COMPLETE APPOINTMENT
    // PUT /api/appointments/{id}/complete
    // =========================================================

    @PutMapping("/{id}/complete")
    public ResponseEntity<AppointmentResponse> completeAppointment(
            @PathVariable Long id
    ) {

        AppointmentResponse response =
                appointmentService.completeAppointment(id);

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // DELETE APPOINTMENT
    // DELETE /api/appointments/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(
            @PathVariable Long id
    ) {

        appointmentService.deleteAppointment(id);

        return ResponseEntity.noContent().build();
    }
}