package com.example.springbootesprit.entities;


public enum Typechambre {
    SIMPLE ,
    DOUBLE ,
    TRIPLE;

    public static Typechambre fromString(String value) {
        // Ajoutez ici la logique de conversion de la chaîne à Typechambre
        return Typechambre.valueOf(value);
    }
}