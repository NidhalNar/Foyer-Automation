package com.example.springbootesprit.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {


    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;


    @Bean


    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                .requestMatchers("/api/v1/auth/**").permitAll()
                .and()// Exige l'authentification pour les requêtes commençant par "/api/v1/auth"
                .oauth2Login()
                .loginPage("/login")
                .successHandler((request, response, authentication) -> {
                    // Redirection personnalisée après une connexion réussie
                    response.sendRedirect("http://localhost:4200/welcome");
                });

        return http.build();

    }
}
