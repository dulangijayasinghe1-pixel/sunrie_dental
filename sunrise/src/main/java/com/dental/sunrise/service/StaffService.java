package com.dental.sunrise.service;

import com.dental.sunrise.dto.staff.StaffProfileResponse;
import com.dental.sunrise.dto.staff.UpdateProfileRequest;
import com.dental.sunrise.entity.Staff;
import com.dental.sunrise.exception.DuplicateResourceException;
import com.dental.sunrise.exception.ResourceNotFoundException;
import com.dental.sunrise.repository.StaffRepository;
import com.dental.sunrise.validation.PhoneNumberValidator;

import org.springframework.stereotype.Service;

@Service
public class StaffService {

    private final StaffRepository staffRepository;
    private final PhoneNumberValidator phoneNumberValidator;

    public StaffService(
            StaffRepository staffRepository,
            PhoneNumberValidator phoneNumberValidator
    ) {
        this.staffRepository = staffRepository;
        this.phoneNumberValidator = phoneNumberValidator;
    }

    // ==========================================
    // GET STAFF PROFILE
    // ==========================================

    public StaffProfileResponse getProfile(String email) {

        Staff staff = staffRepository
                .findByEmailAndActiveTrue(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Staff not found."
                        )
                );

        return mapToResponse(staff);
    }

    // ==========================================
    // UPDATE STAFF PROFILE
    // ==========================================

    public StaffProfileResponse updateProfile(
            String currentEmail,
            UpdateProfileRequest request
    ) {

        Staff staff = staffRepository
                .findByEmailAndActiveTrue(currentEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Staff not found."
                        )
                );

        // Check duplicate email
        if (!staff.getEmail().equalsIgnoreCase(request.getEmail())
                && staffRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException(
                    "Email is already registered."
            );
        }

        // Validate phone number
        phoneNumberValidator.validate(
                request.getPhone()
        );

        // Update details
        staff.setName(request.getName());
        staff.setEmail(request.getEmail());
        staff.setPhone(request.getPhone());

        Staff updatedStaff =
                staffRepository.save(staff);

        return mapToResponse(updatedStaff);
    }

    // ==========================================
    // DEACTIVATE STAFF
    // ==========================================

    public void deactivateStaff(String email) {

        Staff staff = staffRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Staff not found."
                        )
                );

        staff.setActive(false);

        staffRepository.save(staff);
    }

    // ==========================================
    // ACTIVATE STAFF
    // ==========================================

    public void activateStaff(Long staffId) {

        Staff staff = staffRepository
                .findById(staffId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Staff not found with ID: "
                                        + staffId
                        )
                );

        staff.setActive(true);

        staffRepository.save(staff);
    }

    // ==========================================
    // GET STAFF BY ID
    // ==========================================

    public StaffProfileResponse getStaffById(Long staffId) {

        Staff staff = staffRepository
                .findById(staffId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Staff not found with ID: "
                                        + staffId
                        )
                );

        return mapToResponse(staff);
    }

    // ==========================================
    // ENTITY -> RESPONSE
    // ==========================================

    private StaffProfileResponse mapToResponse(
            Staff staff
    ) {

        return StaffProfileResponse.builder()
                .staffId(staff.getId())
                .name(staff.getName())
                .email(staff.getEmail())
                .phone(staff.getPhone())
                .role(staff.getRole().name())
                .emailVerified(staff.isEmailVerified())
                .active(staff.isActive())
                .build();
    }
}