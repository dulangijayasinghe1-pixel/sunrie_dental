package com.dental.sunrise.validation;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AppointmentValidator {

    public void validateDateTime(
            LocalDateTime appointmentDateTime
    ) {

        if (appointmentDateTime == null) {
            throw new IllegalArgumentException(
                    "Appointment date and time are required."
            );
        }

        if (appointmentDateTime.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException(
                    "Appointment date and time cannot be in the past."
            );
        }
    }

    public void validatePatientId(Long patientId) {

        if (patientId == null) {
            throw new IllegalArgumentException(
                    "Patient ID is required."
            );
        }

        if (patientId <= 0) {
            throw new IllegalArgumentException(
                    "Invalid patient ID."
            );
        }
    }

    public void validateDentistId(Long dentistId) {

        if (dentistId == null) {
            throw new IllegalArgumentException(
                    "Dentist ID is required."
            );
        }

        if (dentistId <= 0) {
            throw new IllegalArgumentException(
                    "Invalid dentist ID."
            );
        }
    }

    public void validateAppointment(
            Long patientId,
            Long dentistId,
            LocalDateTime appointmentDateTime
    ) {

        validatePatientId(patientId);
        validateDentistId(dentistId);
        validateDateTime(appointmentDateTime);
    }
}