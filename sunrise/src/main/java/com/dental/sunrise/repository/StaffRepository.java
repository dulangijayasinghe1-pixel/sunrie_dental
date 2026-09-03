package com.dental.sunrise.repository;

import com.dental.sunrise.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    Optional<Staff> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<Staff> findByEmailAndActiveTrue(String email);
}