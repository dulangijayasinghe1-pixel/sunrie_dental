package com.dental.sunrise.repository;

import com.dental.sunrise.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TreatmentRepository extends JpaRepository<Treatment, Long> {

    /*
     * Find treatments for a specific patient
     */
    List<Treatment> findByPatientIdOrderByTreatmentDateDesc(
            Long patientId
    );

    /*
     * Find treatments for a specific dentist
     */
    List<Treatment> findByDentistIdOrderByTreatmentDateDesc(
            Long dentistId
    );

    /*
     * Find treatments for a specific appointment
     */
    List<Treatment> findByAppointmentId(
            Long appointmentId
    );

    /*
     * Find treatments between two dates
     */
    List<Treatment> findByTreatmentDateBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    /*
     * Dashboard:
     * Count treatments by status
     */
    long countByStatus(
            Treatment.TreatmentStatus status
    );

    /*
     * Report:
     * Count treatments created between two dates
     */
    long countByCreatedAtBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    /*
     * Report:
     * Count treatments created between two dates
     * with a specific status
     */
    long countByCreatedAtBetweenAndStatus(
            LocalDateTime start,
            LocalDateTime end,
            Treatment.TreatmentStatus status
    );
}