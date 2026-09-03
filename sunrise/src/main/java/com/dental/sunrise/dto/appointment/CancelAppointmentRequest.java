package com.dental.sunrise.dto.appointment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CancelAppointmentRequest {

    @NotBlank(message = "Cancellation reason is required")
    @Size(
            min = 2,
            max = 500,
            message = "Cancellation reason must be between 2 and 500 characters"
    )
    private String reason;
}