package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.Etudiant;
import com.example.springbootesprit.repositories.EtudiantRepository;
import com.example.springbootesprit.repositories.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor

public class EtudiantService implements IEtudiantService {

    EtudiantRepository etudiantRepository;
    ReservationRepository reservationRepository;

    @Override
    public List<Etudiant> retrieveAllEtudiants() {
        return etudiantRepository.findAll();
    }

    @Override
    public Etudiant addEtudiant(Etudiant e) {
        return etudiantRepository.save(e);
    }

    @Override
    public Etudiant updateEtudiant(Etudiant e) {
        return etudiantRepository.save(e);
    }

    @Override
    public Etudiant retrieveEtudiant(Long idEtudiant) {
        return etudiantRepository.findById(idEtudiant).get();
    }

    @Override
    public void removeEtudiant(Long idEtudiant) {
        etudiantRepository.deleteById(idEtudiant);
    }

    @Override
    public List<Etudiant> addEtudiants(List<Etudiant> etudiants) {
        return null;
    }


    @Override
    public List<Etudiant> getEtudiantsPag(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);
        Page<Etudiant> pagedResult = etudiantRepository.findAll(paging);


        if (pagedResult.hasContent()){
            return pagedResult.getContent();
        }
        else {
            return new ArrayList<Etudiant>();
        }
    }

    @Override
    public long countTotalEtudiants() {
        return etudiantRepository.count();
    }

    @Override
    public long countEtudiantsWithReservations() {
        return etudiantRepository.findAll().stream()
                .filter(etudiant -> etudiant.getReservation() != null && !etudiant.getReservation().isEmpty())
                .count();
    }
}
