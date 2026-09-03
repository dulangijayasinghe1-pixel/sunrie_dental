package com.dental.sunrise.dto.dashboard;

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
public class DashboardResponse {

    // Patient statistics
    private long totalPatients;

    private long newPatients;

    // Dentist statistics
    private long totalDentists;

    private long availableDentists;

    // Appointment statistics
    private long totalAppointments;

    private long todayAppointments;

    private long upcomingAppointments;

    private long completedAppointments;

    private long cancelledAppointments;

    // Treatment statistics
    private long totalTreatments;

    private long ongoingTreatments;

    private long completedTreatments;

    // Billing statistics
    private long totalBills;

    private long pendingBills;

    private long paidBills;

    private BigDecimal totalRevenue;

    private BigDecimal pendingAmount;
}