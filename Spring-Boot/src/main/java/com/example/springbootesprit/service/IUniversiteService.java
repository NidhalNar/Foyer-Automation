package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.Universite;

import java.util.List;
public interface IUniversiteService {
    List<Universite> retrieveAllUniversities();

    List<Universite> allUniversitiesWhereFoyerIsNull();
    Universite addUniversity (Universite u);
    Universite updateUniversity (Universite u);
    Universite retrieveUniversity (long idUniversity);
    void removeUniversity  (long idUniversity );

    Universite affecterFoyerAUniversite(long idFoyer, String nomUniversite);

    Universite desaffecterFoyerAUniversite(long idFoyer, long idUniversite);
}
