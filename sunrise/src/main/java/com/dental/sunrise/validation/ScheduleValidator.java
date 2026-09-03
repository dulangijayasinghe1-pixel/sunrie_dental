package com.dental.sunrise.validation;

import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
public class ScheduleValidator {

    public void validateTime(
            LocalTime startTime,
            LocalTime endTime
    ) {

        if (startTime == null) {
            throw new IllegalArgumentException(
                    "Start time is required."
            );
        }

        if (endTime == null) {
            throw new IllegalArgumentException(
                    "End time is required."
            );
        }

        if (!startTime.isBefore(endTime)) {
            throw new IllegalArgumentException(
                    "Start time must be before end time."
            );
        }
    }

    public void validateDentistId(Long dentistId) {

        if (dentistId == null) {
            throw new IllegalArgumentException(
                    "Dentist ID is required."
            );
        }

        if (dentistId <= 0) {
            throw new IllegalArgumentException(
                    "Invalid dentist ID."
            );
        }
    }

    public void validateDayOfWeek(
            com.dental.sunrise.entity.DentistSchedule.DayOfWeek dayOfWeek
    ) {

        if (dayOfWeek == null) {
            throw new IllegalArgumentException(
                    "Day of week is required."
            );
        }
    }

    public void validateSchedule(
            Long dentistId,
            com.dental.sunrise.entity.DentistSchedule.DayOfWeek dayOfWeek,
            LocalTime startTime,
            LocalTime endTime
    ) {

        validateDentistId(dentistId);

        validateDayOfWeek(dayOfWeek);

        validateTime(startTime, endTime);
    }
}