package ru.mololkin.investingsandbox.entities;

import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

public enum Role implements GrantedAuthority {
    ROLE_ADMIN,
    ROLE_USER;

    @Override
    public String getAuthority() {
        return name();
    }
}
