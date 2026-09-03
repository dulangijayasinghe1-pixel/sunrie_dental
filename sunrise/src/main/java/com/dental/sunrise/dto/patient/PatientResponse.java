package com.dental.sunrise.dto.patient;

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
public class PatientResponse {

    private Long patientId;

    private String name;

    private String dob;

    private int age;

    private String gender;

    private String address;

    private String phone;

    /*
     * Optional.
     * Patient email can be null.
     * It is NOT unique.
     */
    private String email;

    /*
     * Guardian details are mainly relevant
     * for patients below 13.
     */
    private String guardianName;

    private String guardianContact;

    private String guardianEmail;
}