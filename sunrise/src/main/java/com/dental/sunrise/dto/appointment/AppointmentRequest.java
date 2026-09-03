package com.dental.sunrise.dto.appointment;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentRequest {

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotNull(message = "Dentist ID is required")
    private Long dentistId;

    @NotNull(message = "Appointment date and time are required")
    @FutureOrPresent(
            message = "Appointment date and time cannot be in the past"
    )
    private LocalDateTime appointmentDateTime;

    @Size(
            max = 500,
            message = "Reason cannot exceed 500 characters"
    )
    private String reason;
}