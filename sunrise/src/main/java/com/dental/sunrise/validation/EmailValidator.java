package com.dental.sunrise.validation;

import org.springframework.stereotype.Component;

@Component
public class EmailValidator {

    public void validate(String email) {

        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException(
                    "Email is required."
            );
        }

        if (!email.matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"
        )) {
            throw new IllegalArgumentException(
                    "Invalid email format."
            );
        }

        if (email.length() > 150) {
            throw new IllegalArgumentException(
                    "Email cannot exceed 150 characters."
            );
        }
    }
}