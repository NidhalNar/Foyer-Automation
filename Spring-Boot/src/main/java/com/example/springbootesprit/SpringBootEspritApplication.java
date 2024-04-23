package com.example.springbootesprit;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class SpringBootEspritApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootEspritApplication.class, args);
    }


    }
