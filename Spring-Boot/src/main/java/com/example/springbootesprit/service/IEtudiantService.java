package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.Etudiant;

import java.util.List;

public interface IEtudiantService {
    List<Etudiant> retrieveAllEtudiants();

    Etudiant addEtudiant(Etudiant e);

    Etudiant updateEtudiant(Etudiant e);

    Etudiant retrieveEtudiant(Long idEtudiant);

    void removeEtudiant(Long idEtudiant);

    List<Etudiant> addEtudiants(List<Etudiant> etudiants);

    List<Etudiant> getEtudiantsPag(Integer pageNo, Integer pageSize);

    public long countEtudiantsWithReservations() ;
    public long countTotalEtudiants() ;
}
