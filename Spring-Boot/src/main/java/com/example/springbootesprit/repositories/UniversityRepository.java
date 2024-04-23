package com.example.springbootesprit.repositories;

import com.example.springbootesprit.entities.Universite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface UniversityRepository extends JpaRepository<Universite,Long> {
  //  Universite findByNom(String nomUniversite);
    Universite findByNomUniversite(String nomUniversite);

}
