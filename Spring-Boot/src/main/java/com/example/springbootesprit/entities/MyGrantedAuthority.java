package com.example.springbootesprit.entities;

import org.springframework.security.core.GrantedAuthority;

public abstract class MyGrantedAuthority implements GrantedAuthority {
    private String authority;

    public MyGrantedAuthority(String authority) {
        this.authority = authority;
    }

    // Getters and setters, other methods...
}
