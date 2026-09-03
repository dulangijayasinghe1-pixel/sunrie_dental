package com.dental.sunrise.repository;

import com.dental.sunrise.entity.Dentist;
import com.dental.sunrise.entity.DentistSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface DentistScheduleRepository
        extends JpaRepository<DentistSchedule, Long> {

    List<DentistSchedule> findByDentist(Dentist dentist);

    List<DentistSchedule> findByDentistId(Long dentistId);

    Optional<DentistSchedule> findByDentistIdAndDayOfWeek(
            Long dentistId,
            DentistSchedule.DayOfWeek dayOfWeek
    );

    boolean existsByDentistIdAndDayOfWeek(
            Long dentistId,
            DentistSchedule.DayOfWeek dayOfWeek
    );

    boolean existsByDentistIdAndDayOfWeekAndStartTime(
            Long dentistId,
            DentistSchedule.DayOfWeek dayOfWeek,
            LocalTime startTime
    );

    boolean existsByDentistIdAndDayOfWeekAndStartTimeAndIdNot(
            Long dentistId,
            DentistSchedule.DayOfWeek dayOfWeek,
            LocalTime startTime,
            Long id
    );

    List<DentistSchedule> findByDentistIdAndAvailableTrue(
            Long dentistId
    );
}