package com.example.springbootesprit.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table( name = "Universite")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
//@FileDefaults(level=Accesslevel.private)
public class Universite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idUniversite")

    private Long idUniversite; // Clé primaire
    private String nomUniversite;
    private String adresse;
    private TunisianGovernorate grouvenerat;






    @OneToOne (cascade = CascadeType.ALL)
    private Foyer foyer;
}
