package com.dental.sunrise.dto.appointment;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RescheduleAppointmentRequest {

    @NotNull(message = "New appointment date and time are required")
    @FutureOrPresent(message = "New appointment date and time cannot be in the past")
    private LocalDateTime newAppointmentDateTime;

    @Size(
            max = 500,
            message = "Reason cannot exceed 500 characters"
    )
    private String reason;
}