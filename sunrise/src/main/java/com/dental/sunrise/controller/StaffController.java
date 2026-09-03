package com.dental.sunrise.controller;

import com.dental.sunrise.dto.staff.StaffProfileResponse;
import com.dental.sunrise.dto.staff.UpdateProfileRequest;
import com.dental.sunrise.entity.Staff;
import com.dental.sunrise.repository.StaffRepository;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffRepository staffRepository;

    public StaffController(
            StaffRepository staffRepository
    ) {
        this.staffRepository = staffRepository;
    }

    // =========================================================
    // GET MY PROFILE
    // =========================================================

    @GetMapping("/profile")
    public ResponseEntity<StaffProfileResponse> getMyProfile(
            Authentication authentication
    ) {

        String email = authentication.getName();

        Staff staff = staffRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Staff not found."
                        )
                );

        StaffProfileResponse response =
                StaffProfileResponse.builder()
                        .staffId(staff.getId())
                        .name(staff.getName())
                        .email(staff.getEmail())
                        .phone(staff.getPhone())
                        .role(staff.getRole().name())
                        .emailVerified(staff.isEmailVerified())
                        .active(staff.isActive())
                        .build();

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // UPDATE MY PROFILE
    // =========================================================

    @PutMapping("/profile")
    public ResponseEntity<StaffProfileResponse> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request
    ) {

        String currentEmail = authentication.getName();

        Staff staff = staffRepository
                .findByEmail(currentEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Staff not found."
                        )
                );

        // Check whether new email belongs to another staff
        if (!currentEmail.equalsIgnoreCase(request.getEmail())
                && staffRepository.existsByEmail(
                        request.getEmail()
                )) {

            throw new IllegalArgumentException(
                    "Email is already registered."
            );
        }

        staff.setName(request.getName());
        staff.setEmail(request.getEmail());
        staff.setPhone(request.getPhone());

        Staff updatedStaff =
                staffRepository.save(staff);

        StaffProfileResponse response =
                StaffProfileResponse.builder()
                        .staffId(updatedStaff.getId())
                        .name(updatedStaff.getName())
                        .email(updatedStaff.getEmail())
                        .phone(updatedStaff.getPhone())
                        .role(updatedStaff.getRole().name())
                        .emailVerified(
                                updatedStaff.isEmailVerified()
                        )
                        .active(updatedStaff.isActive())
                        .build();

        return ResponseEntity.ok(response);
    }
}