package com.dental.sunrise.repository;

import com.dental.sunrise.entity.Dentist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DentistRepository
        extends JpaRepository<Dentist, Long> {

    Optional<Dentist> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Dentist> findByNameContainingIgnoreCase(String name);

    List<Dentist> findBySpecializationContainingIgnoreCase(
            String specialization
    );

    List<Dentist> findByActiveTrue();

    Optional<Dentist> findByIdAndActiveTrue(Long id);

    long countByActiveTrue();
}