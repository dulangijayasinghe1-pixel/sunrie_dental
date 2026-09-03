package com.dental.sunrise.service;

import com.dental.sunrise.dto.schedule.DentistScheduleRequest;
import com.dental.sunrise.dto.schedule.DentistScheduleResponse;
import com.dental.sunrise.entity.Dentist;
import com.dental.sunrise.entity.DentistSchedule;
import com.dental.sunrise.repository.DentistRepository;
import com.dental.sunrise.repository.DentistScheduleRepository;
import com.dental.sunrise.validation.ScheduleValidator;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DentistScheduleService {

    private final DentistScheduleRepository scheduleRepository;
    private final DentistRepository dentistRepository;
    private final ScheduleValidator scheduleValidator;

    public DentistScheduleService(
            DentistScheduleRepository scheduleRepository,
            DentistRepository dentistRepository,
            ScheduleValidator scheduleValidator
    ) {
        this.scheduleRepository = scheduleRepository;
        this.dentistRepository = dentistRepository;
        this.scheduleValidator = scheduleValidator;
    }

    /*
     * CREATE SCHEDULE
     */
    public DentistScheduleResponse createSchedule(
            DentistScheduleRequest request
    ) {

        scheduleValidator.validateSchedule(
                request.getDentistId(),
                request.getDayOfWeek(),
                request.getStartTime(),
                request.getEndTime()
        );

        Dentist dentist = dentistRepository
                .findById(request.getDentistId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Dentist not found with ID: "
                                        + request.getDentistId()
                        )
                );

        if (scheduleRepository
                .existsByDentistIdAndDayOfWeek(
                        request.getDentistId(),
                        request.getDayOfWeek()
                )) {

            throw new IllegalArgumentException(
                    "A schedule already exists for this dentist on this day."
            );
        }

        DentistSchedule schedule = DentistSchedule.builder()
                .dentist(dentist)
                .dayOfWeek(request.getDayOfWeek())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .available(request.isAvailable())
                .build();

        DentistSchedule savedSchedule =
                scheduleRepository.save(schedule);

        return mapToResponse(savedSchedule);
    }

    /*
     * GET BY ID
     */
    public DentistScheduleResponse getScheduleById(Long id) {

        DentistSchedule schedule = scheduleRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Schedule not found with ID: " + id
                        )
                );

        return mapToResponse(schedule);
    }

    /*
     * GET ALL
     */
    public List<DentistScheduleResponse> getAllSchedules() {

        return scheduleRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /*
     * GET BY DENTIST
     */
    public List<DentistScheduleResponse> getSchedulesByDentist(
            Long dentistId
    ) {

        scheduleValidator.validateDentistId(dentistId);

        if (!dentistRepository.existsById(dentistId)) {
            throw new IllegalArgumentException(
                    "Dentist not found with ID: " + dentistId
            );
        }

        return scheduleRepository
                .findByDentistId(dentistId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /*
     * UPDATE
     */
    public DentistScheduleResponse updateSchedule(
            Long id,
            DentistScheduleRequest request
    ) {

        DentistSchedule schedule = scheduleRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Schedule not found with ID: " + id
                        )
                );

        scheduleValidator.validateSchedule(
                request.getDentistId(),
                request.getDayOfWeek(),
                request.getStartTime(),
                request.getEndTime()
        );

        Dentist dentist = dentistRepository
                .findById(request.getDentistId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Dentist not found with ID: "
                                        + request.getDentistId()
                        )
                );

        if (scheduleRepository
                .existsByDentistIdAndDayOfWeekAndStartTimeAndIdNot(
                        request.getDentistId(),
                        request.getDayOfWeek(),
                        request.getStartTime(),
                        id
                )) {

            throw new IllegalArgumentException(
                    "Another schedule already exists for this dentist at this time."
            );
        }

        schedule.setDentist(dentist);
        schedule.setDayOfWeek(request.getDayOfWeek());
        schedule.setStartTime(request.getStartTime());
        schedule.setEndTime(request.getEndTime());
        schedule.setAvailable(request.isAvailable());

        DentistSchedule updatedSchedule =
                scheduleRepository.save(schedule);

        return mapToResponse(updatedSchedule);
    }

    /*
     * DELETE
     */
    public void deleteSchedule(Long id) {

        DentistSchedule schedule = scheduleRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Schedule not found with ID: " + id
                        )
                );

        scheduleRepository.delete(schedule);
    }

    /*
     * ENABLE / DISABLE
     */
    public DentistScheduleResponse updateAvailability(
            Long id,
            boolean available
    ) {

        DentistSchedule schedule = scheduleRepository
                .findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Schedule not found with ID: " + id
                        )
                );

        schedule.setAvailable(available);

        DentistSchedule updatedSchedule =
                scheduleRepository.save(schedule);

        return mapToResponse(updatedSchedule);
    }

    /*
     * ENTITY -> RESPONSE
     */
    private DentistScheduleResponse mapToResponse(
            DentistSchedule schedule
    ) {

        return DentistScheduleResponse.builder()
                .scheduleId(schedule.getId())
                .dentistId(schedule.getDentist().getId())
                .dentistName(schedule.getDentist().getName())
                .dayOfWeek(schedule.getDayOfWeek())
                .startTime(schedule.getStartTime())
                .endTime(schedule.getEndTime())
                .available(schedule.isAvailable())
                .build();
    }
}