package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.Foyer;
import com.example.springbootesprit.entities.Universite;
import com.example.springbootesprit.repositories.FoyerRepository;
import com.example.springbootesprit.repositories.UniversiteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UniversitéService implements IUniversiteService{
    UniversiteRepository universiteRepository;
    FoyerRepository foyerRepository;

    @Override
    public List<Universite> retrieveAllUniversities() {
        return universiteRepository.findAll();
    }


    @Override
    public List<Universite> allUniversitiesWhereFoyerIsNull() {
        return universiteRepository.findByFoyerIsNull();
    }

    @Override
    public Universite addUniversity(Universite u) {
        return universiteRepository.save(u);
    }

    @Override
    public Universite updateUniversity(Universite u) {
        return universiteRepository.save(u);
    }

    @Override
    public Universite retrieveUniversity(long idUniversity) {
        return universiteRepository.findById(idUniversity).get();
    }

    @Override
    public void removeUniversity(long idUniversity) {
        universiteRepository.deleteById(idUniversity);

    }

    @Override
    public Universite affecterFoyerAUniversite(long idFoyer, String nomUniversite) {
        Universite universite = universiteRepository.findByNomUniversite(nomUniversite);
        Foyer foyer = foyerRepository.findById(idFoyer).get();
        universite.setFoyer(foyer);
        universiteRepository.save(universite);
        return universite;
    }

    @Override
    public Universite desaffecterFoyerAUniversite(long idFoyer, long idUniversite) {
        Universite universite = universiteRepository.findById(idUniversite).get();
        Foyer foyer = foyerRepository.findById(idFoyer).get();
        universite.setFoyer(null);
        return universite;
    }

}