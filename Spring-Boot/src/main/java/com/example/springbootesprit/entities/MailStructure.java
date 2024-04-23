package com.example.springbootesprit.entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailStructure {
    private String subject;
    private String message;
    private String contenu;
    public MailStructure(String contenu) {
        this.contenu = contenu;
    }
}
