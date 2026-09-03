package com.dental.sunrise.validation;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class BillValidator {

    // =========================
    // CREATE / UPDATE VALIDATION
    // =========================

    public void validate(
            Long patientId,
            Long treatmentId,
            BigDecimal amount
    ) {

        if (patientId == null) {

            throw new IllegalArgumentException(
                    "Patient ID is required."
            );
        }

        if (treatmentId == null) {

            throw new IllegalArgumentException(
                    "Treatment ID is required."
            );
        }

        if (amount == null) {

            throw new IllegalArgumentException(
                    "Bill amount is required."
            );
        }

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {

            throw new IllegalArgumentException(
                    "Bill amount must be greater than zero."
            );
        }
    }

    // =========================
    // DISCOUNT VALIDATION
    // =========================

    public void validateDiscount(
            BigDecimal amount,
            BigDecimal discount
    ) {

        if (discount == null) {
            return;
        }

        if (discount.compareTo(BigDecimal.ZERO) < 0) {

            throw new IllegalArgumentException(
                    "Discount cannot be negative."
            );
        }

        if (amount != null &&
                discount.compareTo(amount) > 0) {

            throw new IllegalArgumentException(
                    "Discount cannot be greater than the amount."
            );
        }
    }

    // =========================
    // PAYMENT STATUS
    // =========================

    public boolean isValidPaymentStatus(
            String status
    ) {

        if (status == null ||
                status.isBlank()) {

            return false;
        }

        return switch (status.toUpperCase()) {

            case "PENDING",
                 "PAID",
                 "PARTIALLY_PAID",
                 "CANCELLED" -> true;

            default -> false;
        };
    }
}