package com.dental.sunrise.validation;

import org.springframework.stereotype.Component;

@Component
public class PhoneNumberValidator {

    public void validate(String phone) {

        if (phone == null || phone.isBlank()) {
            throw new IllegalArgumentException(
                    "Phone number is required."
            );
        }

        if (!phone.matches("^(?:\\+94|0)7\\d{8}$")) {
            throw new IllegalArgumentException(
                    "Invalid Sri Lankan phone number."
            );
        }
    }
}