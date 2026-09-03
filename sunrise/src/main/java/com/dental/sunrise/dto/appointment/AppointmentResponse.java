package com.dental.sunrise.dto.appointment;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentResponse {

    private Long appointmentId;

    private Long patientId;

    private String patientName;

    private Long dentistId;

    private String dentistName;

    private LocalDateTime appointmentDateTime;

    private String status;

    private String reason;
}