package com.dental.sunrise.security;

import com.dental.sunrise.entity.Staff;
import com.dental.sunrise.repository.StaffRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final StaffRepository staffRepository;

    public CustomUserDetailsService(
            StaffRepository staffRepository
    ) {
        this.staffRepository = staffRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        Staff staff = staffRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Staff not found with email: " + email
                        )
                );

        return User.builder()
                .username(staff.getEmail())
                .password(staff.getPassword())
                .authorities(
                        List.of(
                                new SimpleGrantedAuthority(
                                        "ROLE_" + staff.getRole().name()
                                )
                        )
                )
                .disabled(!staff.isActive())
                .build();
    }
}