package com.dental.sunrise.repository;

import com.dental.sunrise.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface BillRepository
        extends JpaRepository<Bill, Long> {

    /*
     * Find bills of a specific patient
     */
    List<Bill> findByPatientIdOrderByBillDateDesc(
            Long patientId
    );

    /*
     * Find bills by appointment
     */
    List<Bill> findByAppointmentId(
            Long appointmentId
    );

    /*
     * Find bills by payment status
     */
    List<Bill> findByPaymentStatus(
            Bill.PaymentStatus paymentStatus
    );

    /*
     * Find bills between dates
     */
    List<Bill> findByBillDateBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    /*
     * Find patient's bills by payment status
     */
    List<Bill> findByPatientIdAndPaymentStatus(
            Long patientId,
            Bill.PaymentStatus paymentStatus
    );

    /*
     * Dashboard:
     * Count bills by payment status
     */
    long countByPaymentStatus(
            Bill.PaymentStatus paymentStatus
    );

    /*
     * Dashboard:
     * Total revenue from PAID bills
     */
    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Bill b
        WHERE b.paymentStatus =
            com.dental.sunrise.entity.Bill$PaymentStatus.PAID
    """)
    BigDecimal getTotalRevenue();

    /*
     * Dashboard:
     * Total pending bill amount
     */
    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Bill b
        WHERE b.paymentStatus =
            com.dental.sunrise.entity.Bill$PaymentStatus.PENDING
    """)
    BigDecimal getPendingAmount();

    /*
     * Report:
     * Count bills created between dates
     */
    long countByCreatedAtBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    /*
     * Report:
     * Count bills created between dates
     * with a specific payment status
     */
    long countByCreatedAtBetweenAndPaymentStatus(
            LocalDateTime start,
            LocalDateTime end,
            Bill.PaymentStatus paymentStatus
    );

    /*
     * Report:
     * Revenue from PAID bills between dates
     */
    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Bill b
        WHERE b.createdAt >= :start
        AND b.createdAt < :end
        AND b.paymentStatus =
            com.dental.sunrise.entity.Bill$PaymentStatus.PAID
    """)
    BigDecimal getRevenueBetween(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    /*
     * Report:
     * Pending amount between dates
     */
    @Query("""
        SELECT COALESCE(SUM(b.totalAmount), 0)
        FROM Bill b
        WHERE b.createdAt >= :start
        AND b.createdAt < :end
        AND b.paymentStatus =
            com.dental.sunrise.entity.Bill$PaymentStatus.PENDING
    """)
    BigDecimal getPendingAmountBetween(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}