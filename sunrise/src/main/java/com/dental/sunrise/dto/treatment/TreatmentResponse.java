package com.dental.sunrise.dto.treatment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TreatmentResponse {

    private Long treatmentId;

    private Long patientId;

    private String patientName;

    private Long dentistId;

    private String dentistName;

    private Long appointmentId;

    private String treatmentName;

    private String description;

    private BigDecimal cost;

    private String status;

    private LocalDateTime treatmentDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}