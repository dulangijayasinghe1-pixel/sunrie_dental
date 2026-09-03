package com.dental.sunrise.dto.staff;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffProfileResponse {

    private Long staffId;

    private String name;

    private String email;

    private String phone;

    private String role;

    private boolean emailVerified;

    private boolean active;
}