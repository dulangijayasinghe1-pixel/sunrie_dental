package com.dental.sunrise.service;

import com.dental.sunrise.dto.auth.ChangePasswordRequest;
import com.dental.sunrise.dto.auth.ForgotPasswordRequest;
import com.dental.sunrise.dto.auth.LoginRequest;
import com.dental.sunrise.dto.auth.LoginResponse;
import com.dental.sunrise.dto.auth.ResetPasswordRequest;
import com.dental.sunrise.dto.auth.StaffRegisterRequest;
import com.dental.sunrise.dto.auth.VerifyEmailRequest;
import com.dental.sunrise.dto.auth.VerifyResetOtpRequest;

import com.dental.sunrise.entity.OtpVerification;
import com.dental.sunrise.entity.Staff;

import com.dental.sunrise.exception.DuplicateResourceException;
import com.dental.sunrise.exception.InvalidPasswordException;

import com.dental.sunrise.repository.OtpVerificationRepository;
import com.dental.sunrise.repository.StaffRepository;

import com.dental.sunrise.security.JwtService;

import com.dental.sunrise.validation.EmailValidator;
import com.dental.sunrise.validation.PasswordValidator;
import com.dental.sunrise.validation.PhoneNumberValidator;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final StaffRepository staffRepository;
    private final OtpVerificationRepository otpVerificationRepository;

    private final PasswordEncoder passwordEncoder;
    private final PasswordValidator passwordValidator;
    private final EmailValidator emailValidator;
    private final PhoneNumberValidator phoneNumberValidator;

    private final JwtService jwtService;
    private final OtpService otpService;

    public AuthService(
            StaffRepository staffRepository,
            OtpVerificationRepository otpVerificationRepository,
            PasswordEncoder passwordEncoder,
            PasswordValidator passwordValidator,
            EmailValidator emailValidator,
            PhoneNumberValidator phoneNumberValidator,
            JwtService jwtService,
            OtpService otpService
    ) {
        this.staffRepository = staffRepository;
        this.otpVerificationRepository = otpVerificationRepository;
        this.passwordEncoder = passwordEncoder;
        this.passwordValidator = passwordValidator;
        this.emailValidator = emailValidator;
        this.phoneNumberValidator = phoneNumberValidator;
        this.jwtService = jwtService;
        this.otpService = otpService;
    }

    // =========================================================
    // REGISTER STAFF
    // =========================================================

    public void register(StaffRegisterRequest request) {

        emailValidator.validate(
                request.getEmail()
        );

        passwordValidator.validate(
                request.getPassword()
        );

        phoneNumberValidator.validate(
                request.getPhone()
        );

        if (staffRepository.existsByEmail(
                request.getEmail()
        )) {

            throw new DuplicateResourceException(
                    "Email is already registered."
            );
        }

        Staff staff = Staff.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .phone(request.getPhone())
                .role(Staff.Role.STAFF)
                .emailVerified(false)
                .active(true)
                .build();

        staffRepository.save(staff);

        // Send email verification OTP
        otpService.createEmailVerificationOtp(
                staff.getEmail()
        );
    }

    // =========================================================
    // VERIFY EMAIL
    // =========================================================

    public void verifyEmail(
            VerifyEmailRequest request
    ) {

        emailValidator.validate(
                request.getEmail()
        );

        otpService.verifyEmailOtp(
                request.getEmail(),
                request.getOtp()
        );

        Staff staff = staffRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Staff not found."
                        )
                );

        staff.setEmailVerified(true);

        staffRepository.save(staff);
    }

    // =========================================================
    // LOGIN
    // =========================================================

    public LoginResponse login(
            LoginRequest request
    ) {

        emailValidator.validate(
                request.getEmail()
        );

        Staff staff = staffRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Invalid email or password."
                        )
                );

        if (!staff.isActive()) {

            throw new IllegalArgumentException(
                    "Staff account is inactive."
            );
        }

        if (!staff.isEmailVerified()) {

            throw new IllegalArgumentException(
                    "Email is not verified."
            );
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                staff.getPassword()
        )) {

            throw new InvalidPasswordException(
                    "Invalid email or password."
            );
        }

        // Generate JWT token
        String token = jwtService.generateToken(
                staff.getEmail(),
                staff.getRole().name()
        );

        return LoginResponse.builder()
                .token(token)
                .email(staff.getEmail())
                .name(staff.getName())
                .role(staff.getRole().name())
                .build();
    }

    // =========================================================
    // FORGOT PASSWORD
    // =========================================================

    public void forgotPassword(
            ForgotPasswordRequest request
    ) {

        emailValidator.validate(
                request.getEmail()
        );

        if (!staffRepository.existsByEmail(
                request.getEmail()
        )) {

            throw new IllegalArgumentException(
                    "No account found with this email."
            );
        }

        /*
         * Create a new password reset OTP.
         *
         * Old PASSWORD_RESET OTP is removed
         * inside OtpService before creating
         * the new OTP.
         */
        otpService.createPasswordResetOtp(
                request.getEmail()
        );
    }

    // =========================================================
    // VERIFY PASSWORD RESET OTP
    // =========================================================

    public String verifyResetOtp(
            VerifyResetOtpRequest request
    ) {

        emailValidator.validate(
                request.getEmail()
        );

        /*
         * Verify the OTP.
         *
         * If OTP is correct:
         * - OTP becomes verified
         * - A temporary reset token is generated
         * - Reset token is returned
         */
        return otpService.verifyPasswordResetOtp(
                request.getEmail(),
                request.getOtp()
        );
    }

    // =========================================================
    // RESET PASSWORD
    // =========================================================

    public void resetPassword(
            ResetPasswordRequest request
    ) {

        emailValidator.validate(
                request.getEmail()
        );

        // Validate new password
        passwordValidator.validate(
                request.getNewPassword()
        );

        // Check new password and confirm password
        if (!request.getNewPassword().equals(
                request.getConfirmPassword()
        )) {

            throw new IllegalArgumentException(
                    "New password and confirm password do not match."
            );
        }

        /*
         * OTP was already verified in:
         *
         * POST /api/auth/verify-reset-otp
         *
         * Here we DO NOT check the OTP again.
         *
         * We use the resetToken generated
         * after successful OTP verification.
         */
        OtpVerification verification =
                otpService.getVerifiedResetToken(
                        request.getEmail(),
                        request.getResetToken()
                );

        // Find staff account
        Staff staff = staffRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Staff not found."
                        )
                );

        // Set new password
        staff.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        // Save new password
        staffRepository.save(staff);

        /*
         * Delete the OTP + reset token after
         * successful password reset.
         *
         * Therefore the same reset token
         * cannot be used again.
         */
        otpVerificationRepository.delete(
                verification
        );
    }

    // =========================================================
    // CHANGE PASSWORD
    // =========================================================

    public void changePassword(
            String email,
            ChangePasswordRequest request
    ) {

        Staff staff = staffRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Staff not found."
                        )
                );

        // Check current password
        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                staff.getPassword()
        )) {

            throw new InvalidPasswordException(
                    "Current password is incorrect."
            );
        }

        // Validate new password
        passwordValidator.validate(
                request.getNewPassword()
        );

        // Save new password
        staff.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        staffRepository.save(staff);
    }

    // =========================================================
    // LOGOUT
    // =========================================================

    public void logout() {

        /*
         * JWT authentication is stateless.
         *
         * Therefore no database operation is
         * required here.
         *
         * Frontend should remove the JWT token
         * from local storage/session storage.
         */
    }
}