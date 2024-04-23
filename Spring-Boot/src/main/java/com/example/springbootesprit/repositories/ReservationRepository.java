package com.example.springbootesprit.repositories;

import com.example.springbootesprit.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    List<Reservation> findByAnneeUniversitaireBetween(Date dateDebut, Date dateFin);

    List<Reservation> findByEstValideFalse();

}
