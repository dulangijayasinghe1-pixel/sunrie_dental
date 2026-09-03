package com.dental.sunrise.service;

import com.dental.sunrise.dto.report.ReportResponse;
import com.dental.sunrise.entity.Appointment;
import com.dental.sunrise.entity.Bill;
import com.dental.sunrise.entity.Treatment;
import com.dental.sunrise.repository.AppointmentRepository;
import com.dental.sunrise.repository.BillRepository;
import com.dental.sunrise.repository.PatientRepository;
import com.dental.sunrise.repository.TreatmentRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class ReportService {

    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final TreatmentRepository treatmentRepository;
    private final BillRepository billRepository;

    public ReportService(
            PatientRepository patientRepository,
            AppointmentRepository appointmentRepository,
            TreatmentRepository treatmentRepository,
            BillRepository billRepository
    ) {
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
        this.treatmentRepository = treatmentRepository;
        this.billRepository = billRepository;
    }

    /*
     * GENERATE REPORT
     */
    public ReportResponse generateReport(
            LocalDate startDate,
            LocalDate endDate
    ) {

        // =========================
        // VALIDATION
        // =========================

        if (startDate == null) {
            throw new IllegalArgumentException(
                    "Start date is required."
            );
        }

        if (endDate == null) {
            throw new IllegalArgumentException(
                    "End date is required."
            );
        }

        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException(
                    "Start date cannot be after end date."
            );
        }

        // =========================
        // DATE RANGE
        // =========================

        LocalDateTime startDateTime =
                startDate.atStartOfDay();

        /*
         * End date eke full day eka include karanna
         */
        LocalDateTime endDateTime =
                endDate.plusDays(1).atStartOfDay();

        // =========================
        // PATIENT SUMMARY
        // =========================

        long totalPatients =
                patientRepository.countByCreatedAtBetween(
                        startDateTime,
                        endDateTime
                );

        long newPatients =
                patientRepository.countByCreatedAtBetween(
                        startDateTime,
                        endDateTime
                );

        // =========================
        // APPOINTMENT SUMMARY
        // =========================

        long totalAppointments =
                appointmentRepository
                        .countByAppointmentDateTimeBetween(
                                startDateTime,
                                endDateTime
                        );

        long completedAppointments =
                appointmentRepository
                        .countByAppointmentDateTimeBetweenAndStatus(
                                startDateTime,
                                endDateTime,
                                Appointment.AppointmentStatus.COMPLETED
                        );

        long cancelledAppointments =
                appointmentRepository
                        .countByAppointmentDateTimeBetweenAndStatus(
                                startDateTime,
                                endDateTime,
                                Appointment.AppointmentStatus.CANCELLED
                        );

        long scheduledAppointments =
                appointmentRepository
                        .countByAppointmentDateTimeBetweenAndStatus(
                                startDateTime,
                                endDateTime,
                                Appointment.AppointmentStatus.SCHEDULED
                        );

        // =========================
        // TREATMENT SUMMARY
        // =========================

        long totalTreatments =
                treatmentRepository
                        .countByCreatedAtBetween(
                                startDateTime,
                                endDateTime
                        );

        long completedTreatments =
                treatmentRepository
                        .countByCreatedAtBetweenAndStatus(
                                startDateTime,
                                endDateTime,
                                Treatment.TreatmentStatus.COMPLETED
                        );

        long ongoingTreatments =
                treatmentRepository
                        .countByCreatedAtBetweenAndStatus(
                                startDateTime,
                                endDateTime,
                                Treatment.TreatmentStatus.ONGOING
                        );

        // =========================
        // BILLING SUMMARY
        // =========================

        long totalBills =
                billRepository
                        .countByCreatedAtBetween(
                                startDateTime,
                                endDateTime
                        );

        long paidBills =
                billRepository
                        .countByCreatedAtBetweenAndPaymentStatus(
                                startDateTime,
                                endDateTime,
                                Bill.PaymentStatus.PAID
                        );

        long pendingBills =
                billRepository
                        .countByCreatedAtBetweenAndPaymentStatus(
                                startDateTime,
                                endDateTime,
                                Bill.PaymentStatus.PENDING
                        );

        BigDecimal totalRevenue =
                billRepository.getRevenueBetween(
                        startDateTime,
                        endDateTime
                );

        if (totalRevenue == null) {
            totalRevenue = BigDecimal.ZERO;
        }

        BigDecimal pendingAmount =
                billRepository.getPendingAmountBetween(
                        startDateTime,
                        endDateTime
                );

        if (pendingAmount == null) {
            pendingAmount = BigDecimal.ZERO;
        }

        // =========================
        // BUILD RESPONSE
        // =========================

        return ReportResponse.builder()

                // Report period
                .startDate(startDate)
                .endDate(endDate)

                // Patient summary
                .totalPatients(totalPatients)
                .newPatients(newPatients)

                // Appointment summary
                .totalAppointments(totalAppointments)
                .completedAppointments(completedAppointments)
                .cancelledAppointments(cancelledAppointments)
                .scheduledAppointments(scheduledAppointments)

                // Treatment summary
                .totalTreatments(totalTreatments)
                .completedTreatments(completedTreatments)
                .ongoingTreatments(ongoingTreatments)

                // Billing summary
                .totalBills(totalBills)
                .paidBills(paidBills)
                .pendingBills(pendingBills)
                .totalRevenue(totalRevenue)
                .pendingAmount(pendingAmount)

                .build();
    }
}