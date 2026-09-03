package com.dental.sunrise.service;

import com.dental.sunrise.dto.dashboard.DashboardResponse;
import com.dental.sunrise.entity.Appointment;
import com.dental.sunrise.entity.Bill;
import com.dental.sunrise.entity.Treatment;
import com.dental.sunrise.repository.AppointmentRepository;
import com.dental.sunrise.repository.BillRepository;
import com.dental.sunrise.repository.DentistRepository;
import com.dental.sunrise.repository.PatientRepository;
import com.dental.sunrise.repository.TreatmentRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class DashboardService {

    private final PatientRepository patientRepository;
    private final DentistRepository dentistRepository;
    private final AppointmentRepository appointmentRepository;
    private final TreatmentRepository treatmentRepository;
    private final BillRepository billRepository;

    public DashboardService(
            PatientRepository patientRepository,
            DentistRepository dentistRepository,
            AppointmentRepository appointmentRepository,
            TreatmentRepository treatmentRepository,
            BillRepository billRepository
    ) {
        this.patientRepository = patientRepository;
        this.dentistRepository = dentistRepository;
        this.appointmentRepository = appointmentRepository;
        this.treatmentRepository = treatmentRepository;
        this.billRepository = billRepository;
    }

    public DashboardResponse getDashboardSummary() {

        LocalDate today = LocalDate.now();

        LocalDateTime startOfToday =
                today.atStartOfDay();

        LocalDateTime endOfToday =
                today.plusDays(1).atStartOfDay();

        // ==============================
        // PATIENT STATISTICS
        // ==============================

        long totalPatients =
                patientRepository.count();

        long newPatients =
                patientRepository.countByCreatedAtBetween(
                        startOfToday,
                        endOfToday
                );

        // ==============================
        // DENTIST STATISTICS
        // ==============================

        long totalDentists =
                dentistRepository.count();

        long availableDentists =
                dentistRepository.countByActiveTrue();

        // ==============================
        // APPOINTMENT STATISTICS
        // ==============================

        long totalAppointments =
                appointmentRepository.count();

        long todayAppointments =
                appointmentRepository
                        .countByAppointmentDateTimeBetween(
                                startOfToday,
                                endOfToday
                        );

        long upcomingAppointments =
                appointmentRepository
                        .countByAppointmentDateTimeAfter(
                                LocalDateTime.now()
                        );

        long completedAppointments =
                appointmentRepository.countByStatus(
                        Appointment.AppointmentStatus.COMPLETED
                );

        long cancelledAppointments =
                appointmentRepository.countByStatus(
                        Appointment.AppointmentStatus.CANCELLED
                );

        // ==============================
        // TREATMENT STATISTICS
        // ==============================

        long totalTreatments =
                treatmentRepository.count();

        long ongoingTreatments =
                treatmentRepository.countByStatus(
                        Treatment.TreatmentStatus.ONGOING
                );

        long completedTreatments =
                treatmentRepository.countByStatus(
                        Treatment.TreatmentStatus.COMPLETED
                );

        // ==============================
        // BILLING STATISTICS
        // ==============================

        long totalBills =
                billRepository.count();

        long pendingBills =
                billRepository.countByPaymentStatus(
                        Bill.PaymentStatus.PENDING
                );

        long paidBills =
                billRepository.countByPaymentStatus(
                        Bill.PaymentStatus.PAID
                );

        BigDecimal totalRevenue =
                billRepository.getTotalRevenue();

        if (totalRevenue == null) {
            totalRevenue = BigDecimal.ZERO;
        }

        BigDecimal pendingAmount =
                billRepository.getPendingAmount();

        if (pendingAmount == null) {
            pendingAmount = BigDecimal.ZERO;
        }

        // ==============================
        // BUILD RESPONSE
        // ==============================

        return DashboardResponse.builder()

                .totalPatients(totalPatients)
                .newPatients(newPatients)

                .totalDentists(totalDentists)
                .availableDentists(availableDentists)

                .totalAppointments(totalAppointments)
                .todayAppointments(todayAppointments)
                .upcomingAppointments(upcomingAppointments)
                .completedAppointments(completedAppointments)
                .cancelledAppointments(cancelledAppointments)

                .totalTreatments(totalTreatments)
                .ongoingTreatments(ongoingTreatments)
                .completedTreatments(completedTreatments)

                .totalBills(totalBills)
                .pendingBills(pendingBills)
                .paidBills(paidBills)
                .totalRevenue(totalRevenue)
                .pendingAmount(pendingAmount)

                .build();
    }
}