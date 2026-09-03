package com.dental.sunrise.dto.patient;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientRequest {

    @NotBlank(message = "Patient name is required")
    @Size(
            min = 2,
            max = 100,
            message = "Patient name must be between 2 and 100 characters"
    )
    private String name;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be a past date")
    private LocalDate dob;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Address is required")
    @Size(
            min = 5,
            max = 255,
            message = "Address must be between 5 and 255 characters"
    )
    private String address;

    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^(?:\\+94|0)7\\d{8}$",
            message = "Invalid Sri Lankan phone number"
    )
    private String phone;

    /*
     * Patient email is OPTIONAL.
     *
     * Important:
     * Patient email is NOT unique.
     */
    @Email(message = "Invalid email")
    @Size(
            max = 150,
            message = "Email is too long"
    )
    private String email;


    // ==========================================
    // GUARDIAN DETAILS
    // Required when patient age is below 13.
    // ==========================================

    private String guardianName;

    @Pattern(
            regexp = "^(?:\\+94|0)7\\d{8}$",
            message = "Invalid guardian phone number"
    )
    private String guardianContact;

    @Email(message = "Invalid guardian email")
    @Size(
            max = 150,
            message = "Guardian email is too long"
    )
    private String guardianEmail;
}