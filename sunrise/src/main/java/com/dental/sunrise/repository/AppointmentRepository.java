package com.dental.sunrise.repository;

import com.dental.sunrise.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

    /*
     * Find appointments for a specific patient
     */
    List<Appointment> findByPatientIdOrderByAppointmentDateTimeDesc(
            Long patientId
    );

    /*
     * Find appointments for a specific dentist
     */
    List<Appointment> findByDentistIdOrderByAppointmentDateTimeAsc(
            Long dentistId
    );

    /*
     * Find appointments between two dates/times
     */
    List<Appointment> findByAppointmentDateTimeBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    /*
     * Find upcoming appointments
     */
    List<Appointment> findByAppointmentDateTimeAfter(
            LocalDateTime dateTime
    );

    /*
     * Find appointments by status
     */
    List<Appointment> findByStatus(
            Appointment.AppointmentStatus status
    );

    /*
     * Dashboard:
     * Count today's appointments
     */
    long countByAppointmentDateTimeBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    /*
     * Dashboard:
     * Count upcoming appointments
     */
    long countByAppointmentDateTimeAfter(
            LocalDateTime dateTime
    );

    /*
     * Dashboard:
     * Count appointments by status
     */
    long countByStatus(
            Appointment.AppointmentStatus status
    );

    /*
     * Report:
     * Count appointments between dates
     * with a specific status
     */
    long countByAppointmentDateTimeBetweenAndStatus(
            LocalDateTime start,
            LocalDateTime end,
            Appointment.AppointmentStatus status
    );
}