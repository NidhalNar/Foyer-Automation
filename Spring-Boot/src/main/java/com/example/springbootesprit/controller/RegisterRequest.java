package com.example.springbootesprit.controller;

import com.example.springbootesprit.entities.Genre;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private  String cin;
    private  String ecole;
    private Date dateNaissance;
    private Genre gender;
}
