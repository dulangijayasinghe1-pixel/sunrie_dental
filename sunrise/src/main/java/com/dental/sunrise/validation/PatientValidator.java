package com.dental.sunrise.validation;

import com.dental.sunrise.entity.Patient;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;

@Component
public class PatientValidator {

    public void validate(Patient patient) {

        if (patient == null) {
            throw new IllegalArgumentException(
                    "Patient details are required."
            );
        }

        if (patient.getName() == null ||
                patient.getName().isBlank()) {

            throw new IllegalArgumentException(
                    "Patient name is required."
            );
        }

        if (patient.getDob() == null) {

            throw new IllegalArgumentException(
                    "Date of birth is required."
            );
        }

        if (patient.getDob().isAfter(LocalDate.now())) {

            throw new IllegalArgumentException(
                    "Date of birth cannot be in the future."
            );
        }

        int age = Period.between(
                patient.getDob(),
                LocalDate.now()
        ).getYears();

        // Patients below 13 must have guardian details
        if (age < 13) {

            if (patient.getGuardianName() == null ||
                    patient.getGuardianName().isBlank()) {

                throw new IllegalArgumentException(
                        "Guardian name is required for patients below 13."
                );
            }

            if (patient.getGuardianContact() == null ||
                    patient.getGuardianContact().isBlank()) {

                throw new IllegalArgumentException(
                        "Guardian contact is required for patients below 13."
                );
            }
        }
    }

    public int calculateAge(LocalDate dob) {

        if (dob == null ||
                dob.isAfter(LocalDate.now())) {

            throw new IllegalArgumentException(
                    "Invalid date of birth."
            );
        }

        return Period.between(
                dob,
                LocalDate.now()
        ).getYears();
    }
}