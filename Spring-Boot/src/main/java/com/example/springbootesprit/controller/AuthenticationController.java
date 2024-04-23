package com.example.springbootesprit.controller;

import com.example.springbootesprit.entities.MailStructure;
import com.example.springbootesprit.service.AuthenticationService;
import com.example.springbootesprit.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor

public class AuthenticationController {

        private final AuthenticationService service;
private  final MailService mailService;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        ResponseEntity<?> registrationResponse = service.register(request);

        if (registrationResponse.getStatusCode() == HttpStatus.OK) {
            String contenuMailBienvenue = "Merci de vous être inscrit sur application foyer. Nous sommes ravis de vous avoir parmi nous !";
            mailService.sendMail(request.getEmail(), new MailStructure(contenuMailBienvenue));

        }

        return registrationResponse;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){

        return ResponseEntity.ok(service.authenticate(request));

    }


}
