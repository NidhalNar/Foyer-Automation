package com.example.springbootesprit.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table( name = "Chambre")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor


public class Chambre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idChambre")

    private Long idChambre; // Clé primairev
    private Long numerochambre;

    @Enumerated (EnumType.STRING)
    Typechambre typechambre;


    @ManyToOne
    private Bloc bloc;

    @OneToMany()

    private Set<Reservation> reservations;

    @OneToMany(mappedBy = "chambre",cascade = CascadeType.ALL)


    private Set<Evaluation> evaluations ;
}
