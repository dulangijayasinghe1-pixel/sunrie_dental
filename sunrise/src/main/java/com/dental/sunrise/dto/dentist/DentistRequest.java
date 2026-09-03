package com.dental.sunrise.dto.dentist;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DentistRequest {

    @NotBlank(message = "Dentist name is required")
    @Size(
            min = 2,
            max = 100,
            message = "Dentist name must be between 2 and 100 characters"
    )
    private String name;

    /*
     * Dentist email is REQUIRED and UNIQUE.
     */
    @NotBlank(message = "Dentist email is required")
    @Email(message = "Invalid email")
    @Size(
            max = 150,
            message = "Email is too long"
    )
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^(?:\\+94|0)7\\d{8}$",
            message = "Invalid Sri Lankan phone number"
    )
    private String phone;

    @NotBlank(message = "Specialization is required")
    @Size(
            min = 2,
            max = 100,
            message = "Specialization must be between 2 and 100 characters"
    )
    private String specialization;

    @NotBlank(message = "Registration number is required")
    @Size(
            min = 2,
            max = 50,
            message = "Invalid registration number"
    )
    private String registrationNumber;
}