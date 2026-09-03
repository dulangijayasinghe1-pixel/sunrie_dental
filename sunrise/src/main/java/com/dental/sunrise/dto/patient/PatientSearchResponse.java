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
public class PatientSearchResponse {

    private Long patientId;

    private String name;

    private int age;

    private String gender;

    private String phone;

    private String email;
}