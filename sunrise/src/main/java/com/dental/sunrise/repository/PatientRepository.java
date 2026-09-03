package com.dental.sunrise.repository;

import com.dental.sunrise.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface PatientRepository
        extends JpaRepository<Patient, Long> {

    List<Patient> findByNameContainingIgnoreCase(String name);

    List<Patient> findByPhoneContaining(String phone);

    List<Patient> findByEmailContainingIgnoreCase(String email);

    List<Patient> findByNameContainingIgnoreCaseOrPhoneContaining(
            String name,
            String phone
    );

    long countByCreatedAtBetween(
            LocalDateTime start,
            LocalDateTime end
    );
}