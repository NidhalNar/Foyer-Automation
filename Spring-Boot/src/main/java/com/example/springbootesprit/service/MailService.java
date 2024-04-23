package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.MailStructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;
    @Value("$(spring.mail.username)")
    private String fromMail;
    public void sendMail(String email, MailStructure mailStructure) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromMail);
        message.setSubject("Bienvenue sur application foyer");
        message.setText("Merci de vous être inscrit sur application foyer. Nous sommes ravis de vous avoir parmi nous !");
        message.setTo(email);

        mailSender.send(message);
    }
}

