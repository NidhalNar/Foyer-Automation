package com.example.springbootesprit.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Evaluation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEvaluation")
    private Long idEvaluation;

    private int note; // La note attribuée par l'utilisateur

    @ManyToOne
    @JoinColumn(name = "id_chambre")
    @JsonIgnore
    private Chambre chambre;
}
