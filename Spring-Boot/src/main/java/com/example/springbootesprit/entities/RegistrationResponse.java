package com.example.springbootesprit.entities;


public class RegistrationResponse {
    private String status;
    // Autres propriétés selon les besoins

    public RegistrationResponse() {
        // Constructeur par défaut
    }

    public RegistrationResponse(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
