package com.dental.sunrise.dto.schedule;

import com.dental.sunrise.entity.DentistSchedule;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DentistScheduleRequest {

    @NotNull(message = "Dentist ID is required")
    private Long dentistId;

    @NotNull(message = "Day of week is required")
    private DentistSchedule.DayOfWeek dayOfWeek;

    @NotNull(message = "Start time is required")
    private LocalTime startTime;

    @NotNull(message = "End time is required")
    private LocalTime endTime;

    private boolean available = true;

    @Size(
            max = 255,
            message = "Notes cannot exceed 255 characters"
    )
    private String notes;
}