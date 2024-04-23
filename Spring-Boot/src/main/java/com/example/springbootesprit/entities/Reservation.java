package com.example.springbootesprit.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;


@Entity
@Getter
@Setter

@AllArgsConstructor
@NoArgsConstructor
@Table( name = "Reservation")
public class Reservation {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name="idReservation")
    private Long idReservation;
    @Temporal(TemporalType.DATE)
    private Date anneeUniversitaire;
    private boolean estValide;

    @ManyToMany(cascade = CascadeType.ALL) //parent
    @JsonIgnore
    private Set<Etudiant> etud;

    @ManyToMany(cascade = CascadeType.ALL) //parent
    @JsonIgnore
    private Set<User> user;


    @ManyToMany(cascade = CascadeType.ALL) // new attribute for roommates
    @JsonIgnore
    @JoinTable(
            name = "reservation_roommates",
            joinColumns = @JoinColumn(name = "idReservation"),
            inverseJoinColumns = @JoinColumn(name = "id")
    )
    private Set<User> roommates;






}
