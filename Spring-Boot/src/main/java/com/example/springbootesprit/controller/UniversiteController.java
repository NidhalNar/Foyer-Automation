package com.example.springbootesprit.controller;


import com.example.springbootesprit.entities.TunisianGovernorate;
import com.example.springbootesprit.entities.Universite;
import com.example.springbootesprit.service.IFoyerService;
import com.example.springbootesprit.service.IUniversiteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/universite")
@CrossOrigin(origins = "http://192.168.43.129:4200")
public class UniversiteController {
    IUniversiteService universiteService;
    IFoyerService foyerService;

    @GetMapping("/retrieveAllUniversities")
    public List<Universite> retrieveAllUniversities() {
        List<Universite> universiteList = universiteService.retrieveAllUniversities();
        return universiteList;
    }

    @GetMapping("/allUniversitiesWhereFoyerIsNull")
    public List<Universite> allUniversitiesWhereFoyerIsNull() {
        List<Universite> universiteList = universiteService.allUniversitiesWhereFoyerIsNull();
        return universiteList;
    }

    @PostMapping("/addUniversity")
    public Universite addUniversity(@RequestBody Universite u) {
        Universite universite = universiteService.addUniversity(u);
        return universite;
    }

    @PutMapping("/updateUniversity")
    public Universite updateUniversity(@RequestBody Universite u) {
        Universite universite = universiteService.updateUniversity(u);
        return universite;
    }

    @GetMapping("/retrieveUniversity/{universite-id}")
    public Universite retrieveUniversity(@PathVariable("universite-id") Long idUniversite) {
        return universiteService.retrieveUniversity(idUniversite);
    }

    @DeleteMapping("/removeUniversity/{universite-id}")
    void removeUniversity(@PathVariable("universite-id") Long idUniversite) {
        universiteService.removeUniversity(idUniversite);
    }

    @PutMapping("/affecterFoyerAUniversite/{idFoyer}/{nomUniversite}")
    @ResponseBody
    public Universite affecterFoyerAUniversite(@PathVariable("idFoyer") long idFoyer, @PathVariable("nomUniversite") String nomUniversite){
        Universite universite=universiteService.affecterFoyerAUniversite(idFoyer,nomUniversite);
        return universite;
    }

    @GetMapping("/retrieve-all-gourvernerats")
    @ResponseBody
    public TunisianGovernorate[] getDepartments() {
        return TunisianGovernorate.values();
    }


}
