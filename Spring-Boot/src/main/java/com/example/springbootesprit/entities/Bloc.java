package com.example.springbootesprit.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.Set;


@Entity
@Table( name = "Bloc")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class Bloc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idBloc")

    private Long idBloc; // Clé primaire
    private String nomBloc;
    private Long capciteBloc;


    @ManyToOne

    Foyer foyer;

    @OneToMany( mappedBy="bloc")
    @JsonIgnore
    private Set<Chambre> chambres ;







}