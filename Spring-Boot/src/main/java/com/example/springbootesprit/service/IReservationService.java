package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.Reservation;

import java.util.List;
import java.util.Optional;

public interface IReservationService {
    List<Reservation> retrieveAllReservation();

    Reservation addReservation(Reservation r);

    Reservation updateReservation(Reservation r);

    Optional<Reservation> retrieveReservation(Long idReservation);

    void removeReservation(Long idReservation);

    List<Reservation> getReservationsNonValides();

    public Reservation validateReservation(Long idReservation);

    public Reservation validateReservationUser(Long idReservation);


    public Reservation makeUserReservationChambre(Long idChambre,String email, Reservation reservation);


}
