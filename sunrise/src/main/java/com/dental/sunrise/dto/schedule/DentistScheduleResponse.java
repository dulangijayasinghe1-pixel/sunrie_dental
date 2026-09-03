package com.dental.sunrise.dto.schedule;

import com.dental.sunrise.entity.DentistSchedule;
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
public class DentistScheduleResponse {

    private Long scheduleId;

    private Long dentistId;

    private String dentistName;

    private DentistSchedule.DayOfWeek dayOfWeek;

    private LocalTime startTime;

    private LocalTime endTime;

    private boolean available;

    private String notes;
}