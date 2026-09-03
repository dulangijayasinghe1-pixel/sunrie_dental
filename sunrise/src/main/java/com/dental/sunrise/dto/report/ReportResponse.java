package com.dental.sunrise.dto.report;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportResponse {

    // Report period
    private LocalDate startDate;

    private LocalDate endDate;

    // Patient summary
    private long totalPatients;

    private long newPatients;

    // Appointment summary
    private long totalAppointments;

    private long completedAppointments;

    private long cancelledAppointments;

    private long scheduledAppointments;

    // Treatment summary
    private long totalTreatments;

    private long completedTreatments;

    private long ongoingTreatments;

    // Billing summary
    private long totalBills;

    private long paidBills;

    private long pendingBills;

    private BigDecimal totalRevenue;

    private BigDecimal pendingAmount;
}