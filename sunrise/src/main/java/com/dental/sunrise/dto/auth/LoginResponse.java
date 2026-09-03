package com.dental.sunrise.dto.auth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private String token;
    private Long staffId;
    private String name;
    private String email;
    private String role;
}