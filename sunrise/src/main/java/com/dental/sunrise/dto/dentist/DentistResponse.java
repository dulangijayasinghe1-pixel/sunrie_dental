package com.dental.sunrise.dto.dentist;

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
public class DentistResponse {

    private Long dentistId;

    private String name;

    private String email;

    private String phone;

    private String specialization;

    private String registrationNumber;

    private boolean active;
}