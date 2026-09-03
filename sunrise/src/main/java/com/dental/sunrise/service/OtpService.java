package com.dental.sunrise.service;

import com.dental.sunrise.entity.OtpVerification;
import com.dental.sunrise.entity.OtpVerification.OtpType;
import com.dental.sunrise.repository.OtpVerificationRepository;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class OtpService {

    private final OtpVerificationRepository otpVerificationRepository;
    private final EmailService emailService;

    private final SecureRandom secureRandom = new SecureRandom();

    public OtpService(
            OtpVerificationRepository otpVerificationRepository,
            EmailService emailService
    ) {
        this.otpVerificationRepository = otpVerificationRepository;
        this.emailService = emailService;
    }

    // =========================================================
    // GENERATE OTP
    // =========================================================

    private String generateOtp() {

        return String.format(
                "%06d",
                secureRandom.nextInt(1_000_000)
        );
    }

    // =========================================================
    // CREATE EMAIL VERIFICATION OTP
    // =========================================================

    public void createEmailVerificationOtp(String email) {

        email = email.trim();

        // Remove old email verification OTP
        otpVerificationRepository.deleteByEmailAndType(
                email,
                OtpType.EMAIL_VERIFICATION
        );

        String otp = generateOtp();

        OtpVerification verification =
                OtpVerification.builder()
                        .email(email)
                        .otp(otp)
                        .type(OtpType.EMAIL_VERIFICATION)
                        .expiresAt(
                                LocalDateTime.now().plusMinutes(10)
                        )
                        .verified(false)
                        .build();

        otpVerificationRepository.save(verification);

        emailService.sendVerificationEmail(
                email,
                otp
        );
    }

    // =========================================================
    // VERIFY EMAIL OTP
    // =========================================================

    public boolean verifyEmailOtp(
            String email,
            String otp
    ) {

        email = email.trim();
        otp = otp.trim();

        OtpVerification verification =
                otpVerificationRepository
                        .findTopByEmailAndTypeAndVerifiedFalseOrderByCreatedAtDesc(
                                email,
                                OtpType.EMAIL_VERIFICATION
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Verification OTP not found."
                                )
                        );

        if (verification.isExpired()) {

            throw new IllegalArgumentException(
                    "Verification OTP has expired."
            );
        }

        if (!verification.getOtp().equals(otp)) {

            throw new IllegalArgumentException(
                    "Invalid verification OTP."
            );
        }

        verification.setVerified(true);

        otpVerificationRepository.save(verification);

        return true;
    }

    // =========================================================
    // CREATE PASSWORD RESET OTP
    // =========================================================

    public void createPasswordResetOtp(String email) {

        email = email.trim();

        /*
         * Every new forgot-password request creates
         * exactly ONE new OTP.
         *
         * Old reset OTP is removed.
         */
        otpVerificationRepository.deleteByEmailAndType(
                email,
                OtpType.PASSWORD_RESET
        );

        String otp = generateOtp();

        OtpVerification verification =
                OtpVerification.builder()
                        .email(email)
                        .otp(otp)
                        .type(OtpType.PASSWORD_RESET)
                        .expiresAt(
                                LocalDateTime.now().plusMinutes(10)
                        )
                        .verified(false)
                        .build();

        otpVerificationRepository.save(verification);

        emailService.sendPasswordResetEmail(
                email,
                otp
        );
    }

    // =========================================================
    // VERIFY PASSWORD RESET OTP
    // =========================================================

    public String verifyPasswordResetOtp(
            String email,
            String otp
    ) {

        email = email.trim();
        otp = otp.trim();

        /*
         * Find only the latest unverified OTP.
         */
        OtpVerification verification =
                otpVerificationRepository
                        .findTopByEmailAndTypeAndVerifiedFalseOrderByCreatedAtDesc(
                                email,
                                OtpType.PASSWORD_RESET
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Password reset OTP not found."
                                )
                        );

        // Check OTP expiry
        if (verification.isExpired()) {

            throw new IllegalArgumentException(
                    "Password reset OTP has expired."
            );
        }

        // Check OTP
        if (!verification.getOtp().equals(otp)) {

            throw new IllegalArgumentException(
                    "Invalid password reset OTP."
            );
        }

        /*
         * OTP is now successfully verified.
         */
        verification.setVerified(true);

        /*
         * Generate a unique temporary reset token.
         */
        String resetToken = UUID.randomUUID().toString();

        verification.setResetToken(resetToken);

        /*
         * Reset token is valid for 10 minutes.
         */
        verification.setResetTokenExpiresAt(
                LocalDateTime.now().plusMinutes(10)
        );

        otpVerificationRepository.save(verification);

        return resetToken;
    }

    // =========================================================
    // FIND VERIFIED RESET TOKEN
    // =========================================================

    public OtpVerification getVerifiedResetToken(
            String email,
            String resetToken
    ) {

        email = email.trim();
        resetToken = resetToken.trim();

        OtpVerification verification =
                otpVerificationRepository
                        .findByEmailAndTypeAndResetToken(
                                email,
                                OtpType.PASSWORD_RESET,
                                resetToken
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Invalid or expired password reset token."
                                )
                        );

        if (!verification.isVerified()) {

            throw new IllegalArgumentException(
                    "Password reset OTP has not been verified."
            );
        }

        if (verification.isResetTokenExpired()) {

            throw new IllegalArgumentException(
                    "Password reset token has expired."
            );
        }

        return verification;
    }
}