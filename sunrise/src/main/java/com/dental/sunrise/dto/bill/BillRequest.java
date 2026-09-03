package com.dental.sunrise.dto.bill;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillRequest {

    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @NotNull(message = "Treatment ID is required")
    private Long treatmentId;

    private Long appointmentId;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private BigDecimal amount;

    private BigDecimal discount;

    @Size(
            max = 500,
            message = "Description cannot exceed 500 characters"
    )
    private String description;

    private String paymentStatus;
}