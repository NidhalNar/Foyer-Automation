package com.example.springbootesprit.repositories;

import com.example.springbootesprit.entities.Bloc;
import com.example.springbootesprit.entities.Foyer;
import com.example.springbootesprit.entities.Typechambre;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface BlocRepository  extends JpaRepository<Bloc,Long> {

    @Query("SELECT COUNT(ch) FROM Bloc b JOIN b.chambres ch WHERE b.idBloc = :idBloc AND ch.typechambre = :type")
    long countChambresByTypeAndBlocId(@Param("type") Typechambre type, @Param("idBloc") long idBloc);


    Bloc findByNomBloc(String nomBloc);

    boolean existsByNomBloc(String nomBloc);
    boolean existsByNomBlocAndFoyer(String nomBloc, Foyer foyer);



}
