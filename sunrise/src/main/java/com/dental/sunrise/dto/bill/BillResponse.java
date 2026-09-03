package com.dental.sunrise.dto.bill;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillResponse {

    private Long billId;

    // =========================
    // PATIENT
    // =========================

    private Long patientId;

    private String patientName;

    private String patientEmail;

    // =========================
    // TREATMENT
    // =========================

    private Long treatmentId;

    private String treatmentName;

    // =========================
    // APPOINTMENT
    // =========================

    private Long appointmentId;

    private LocalDateTime appointmentDateTime;

    // =========================
    // BILL
    // =========================

    private BigDecimal amount;

    private BigDecimal discount;

    private BigDecimal totalAmount;

    private String description;

    // =========================
    // PAYMENT
    // =========================

    private String paymentStatus;

    // =========================
    // DATES
    // =========================

    private LocalDateTime billDate;

    private LocalDateTime paidAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}