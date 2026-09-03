package com.dental.sunrise.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================
    // PATIENT
    // =========================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "patient_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_bill_patient")
    )
    private Patient patient;

    // =========================
    // TREATMENT
    // =========================

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "treatment_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_bill_treatment")
    )
    private Treatment treatment;

    // =========================
    // APPOINTMENT
    // =========================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "appointment_id",
            foreignKey = @ForeignKey(name = "fk_bill_appointment")
    )
    private Appointment appointment;

    // =========================
    // AMOUNT
    // =========================

    @Column(
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal amount;

    @Builder.Default
    @Column(
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal discount = BigDecimal.ZERO;

    @Column(
            nullable = false,
            precision = 10,
            scale = 2
    )
    private BigDecimal totalAmount;

    // =========================
    // PAYMENT STATUS
    // =========================

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false,
            length = 20
    )
    private PaymentStatus paymentStatus =
            PaymentStatus.PENDING;

    // =========================
    // DESCRIPTION
    // =========================

    @Column(length = 500)
    private String description;

    // =========================
    // DATES
    // =========================

    @Column(nullable = false)
    private LocalDateTime billDate;

    private LocalDateTime paidAt;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // =========================
    // PRE PERSIST
    // =========================

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();

        if (billDate == null) {
            billDate = LocalDateTime.now();
        }

        if (discount == null) {
            discount = BigDecimal.ZERO;
        }

        if (amount == null) {
            amount = BigDecimal.ZERO;
        }

        if (totalAmount == null) {
            totalAmount = amount.subtract(discount);
        }

        updatedAt = LocalDateTime.now();
    }

    // =========================
    // PRE UPDATE
    // =========================

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

        if (discount == null) {
            discount = BigDecimal.ZERO;
        }

        if (amount != null) {
            totalAmount = amount.subtract(discount);
        }
    }

    // =========================
    // PAYMENT STATUS ENUM
    // =========================

    public enum PaymentStatus {

        PENDING,

        PAID,

        PARTIALLY_PAID,

        CANCELLED
    }
}