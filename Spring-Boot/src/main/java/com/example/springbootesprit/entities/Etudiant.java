package com.example.springbootesprit.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table( name = "Etudiant")
public class Etudiant {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name="idEtudiant")
    private Long idEtudiant;
    private String firstname ;
    private String lastname ;
    private String email;
    private Long cin;
    private String ecole ;

    @Temporal(TemporalType.DATE)
    private Date dateNaissance;

    @Enumerated(EnumType.STRING)
    private Genre gender;
    @ManyToMany(mappedBy="etud", cascade = CascadeType.ALL) //fils

        private List<Reservation> Reservation;







}
