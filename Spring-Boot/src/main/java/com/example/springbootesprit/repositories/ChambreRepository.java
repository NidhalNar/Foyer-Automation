package com.example.springbootesprit.repositories;

import com.example.springbootesprit.entities.Bloc;
import com.example.springbootesprit.entities.Chambre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ChambreRepository extends JpaRepository<Chambre,Long> {

    Chambre findByNumerochambre(Long numerochambre);

    //  List<Chambre> findByTypechambre(Typechambre typechambre);

    @Query("SELECT c FROM Chambre c WHERE c.bloc.idBloc = :idBloc")
    List<Chambre> findByBlocId(@Param("idBloc") Long idBloc);


    @Query("SELECT b.nomBloc, c, c.typechambre, CASE WHEN r.idReservation IS NOT NULL THEN true ELSE false END " +
            "FROM Bloc b LEFT JOIN b.chambres c LEFT JOIN c.reservations r")
    List<Object[]> getStatistiqueBlocs();


    // Méthode pour récupérer le nombre total de places pour une chambre spécifique
    @Query("SELECT c.numerochambre FROM Chambre c WHERE c.idChambre = :idChambre")
    int findNombreTotalPlacesByIdChambre(Long idChambre);
    List<Chambre> findByidChambreAndReservationsAnneeUniversitaireBetween(Long idChambre, Date dateDebut, Date dateFin);
    List<Chambre> findByReservationsIdReservation(Long idReservation);

    boolean existsByNumerochambreAndBloc(Long numeroChambre, Bloc bloc);

}