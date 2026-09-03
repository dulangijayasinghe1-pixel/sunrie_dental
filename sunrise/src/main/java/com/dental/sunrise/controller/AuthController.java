package com.dental.sunrise.controller;

import com.dental.sunrise.dto.auth.ChangePasswordRequest;
import com.dental.sunrise.dto.auth.ForgotPasswordRequest;
import com.dental.sunrise.dto.auth.LoginRequest;
import com.dental.sunrise.dto.auth.LoginResponse;
import com.dental.sunrise.dto.auth.ResetPasswordRequest;
import com.dental.sunrise.dto.auth.StaffRegisterRequest;
import com.dental.sunrise.dto.auth.VerifyEmailRequest;
import com.dental.sunrise.dto.auth.VerifyResetOtpRequest;
import com.dental.sunrise.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // =========================
    // REGISTER
    // =========================
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody StaffRegisterRequest request) {

        authService.register(request);

        return ResponseEntity.ok(
                Map.of("message", "Registration successful. Please verify your email.")
        );
    }

    // =========================
    // VERIFY EMAIL
    // =========================
    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(
            @Valid @RequestBody VerifyEmailRequest request) {

        authService.verifyEmail(request);

        return ResponseEntity.ok(
                Map.of("message", "Email verified successfully.")
        );
    }

    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    // =========================
    // FORGOT PASSWORD
    // =========================
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        authService.forgotPassword(request);

        return ResponseEntity.ok(
                Map.of("message", "Password reset OTP has been sent to your email.")
        );
    }

    // =========================
    // VERIFY RESET OTP
    // =========================
    @PostMapping("/verify-reset-otp")
    public ResponseEntity<?> verifyResetOtp(
            @Valid @RequestBody VerifyResetOtpRequest request) {

        String resetToken = authService.verifyResetOtp(request);

        return ResponseEntity.ok(
                Map.of(
                        "message", "OTP verified successfully.",
                        "resetToken", resetToken
                )
        );
    }

    // =========================
    // RESET PASSWORD
    // =========================
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        authService.resetPassword(request);

        return ResponseEntity.ok(
                Map.of("message", "Password reset successfully.")
        );
    }

    // =========================
    // CHANGE PASSWORD
    // =========================
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestHeader("X-User-Email") String email,
            @Valid @RequestBody ChangePasswordRequest request) {

        authService.changePassword(email, request);

        return ResponseEntity.ok(
                Map.of("message", "Password changed successfully.")
        );
    }

    // =========================
    // LOGOUT
    // =========================
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {

        authService.logout();

        return ResponseEntity.ok(
                Map.of("message", "Logged out successfully.")
        );
    }
}