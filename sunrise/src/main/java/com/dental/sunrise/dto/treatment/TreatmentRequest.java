package com.dental.sunrise.dto.treatment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TreatmentRequest {

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotNull(message = "Dentist ID is required")
    private Long dentistId;

    private Long appointmentId;

    @NotBlank(message = "Treatment name is required")
    @Size(
            min = 2,
            max = 150,
            message = "Treatment name must be between 2 and 150 characters"
    )
    private String treatmentName;

    @Size(
            max = 1000,
            message = "Treatment description cannot exceed 1000 characters"
    )
    private String description;

    @NotNull(message = "Treatment cost is required")
    @Positive(message = "Treatment cost must be greater than zero")
    private BigDecimal cost;

    private String status;
}