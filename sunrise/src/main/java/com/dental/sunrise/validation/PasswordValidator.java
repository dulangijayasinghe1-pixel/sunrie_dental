package com.dental.sunrise.validation;

import org.springframework.stereotype.Component;

@Component
public class PasswordValidator {

    public void validate(String password) {

        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException(
                    "Password is required."
            );
        }

        if (password.length() < 8) {
            throw new IllegalArgumentException(
                    "Password must be at least 8 characters long."
            );
        }

        if (password.length() > 100) {
            throw new IllegalArgumentException(
                    "Password cannot exceed 100 characters."
            );
        }

        if (!password.matches(".*[A-Z].*")) {
            throw new IllegalArgumentException(
                    "Password must contain at least one uppercase letter."
            );
        }

        if (!password.matches(".*[a-z].*")) {
            throw new IllegalArgumentException(
                    "Password must contain at least one lowercase letter."
            );
        }

        if (!password.matches(".*\\d.*")) {
            throw new IllegalArgumentException(
                    "Password must contain at least one number."
            );
        }
    }
}