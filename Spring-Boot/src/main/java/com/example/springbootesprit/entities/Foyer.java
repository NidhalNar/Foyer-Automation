package com.example.springbootesprit.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;


@Entity
@Table( name = "Foyer")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor


public class Foyer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idFoyer")

    private Long idFoyer; // Clé primaire
    private String nomFoyer;
    private Long capciteFoyer;
    @Enumerated(EnumType.STRING)
    private TypeFoyer type;
    @OneToMany( mappedBy="foyer" )//fils
    @JsonIgnore
    private Set<Bloc> Blocs ;

    @OneToOne (mappedBy="foyer")
    @JsonIgnore
    private  Universite universite;


    public Foyer(Long idFoyer, String nomFoyer, Long capciteFoyer, TypeFoyer type) {
        this.idFoyer = idFoyer;
        this.nomFoyer = nomFoyer;
        this.capciteFoyer = capciteFoyer;
        this.type = type;
    }

}
