package com.example.springbootesprit.repositories;

import com.example.springbootesprit.entities.Etudiant;
import com.example.springbootesprit.entities.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface EtudiantRepository extends JpaRepository<Etudiant,Long> {
    Etudiant findByFirstnameAndLastname(String firstname, String lastname);
    boolean existsByIdEtudiant(Long idEtudiant);
    List<Etudiant> findAllByGenderAndIdEtudiantNot(Genre gender, Long idEtudiant);
}
