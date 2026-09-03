package com.dental.sunrise.repository;

import com.dental.sunrise.entity.OtpVerification;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpVerificationRepository
        extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification>
    findTopByEmailAndTypeAndVerifiedFalseOrderByCreatedAtDesc(
            String email,
            OtpVerification.OtpType type
    );

    void deleteByEmailAndType(
            String email,
            OtpVerification.OtpType type
    );

    Optional<OtpVerification>
    findTopByEmailAndTypeOrderByCreatedAtDesc(
            String email,
            OtpVerification.OtpType type
    );

    Optional<OtpVerification>
    findTopByEmailAndTypeAndVerifiedTrueOrderByCreatedAtDesc(
            String email,
            OtpVerification.OtpType type
    );

    Optional<OtpVerification>
    findByEmailAndTypeAndResetToken(
            String email,
            OtpVerification.OtpType type,
            String resetToken
    );
}