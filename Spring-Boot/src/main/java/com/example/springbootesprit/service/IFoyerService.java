package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.Foyer;
import com.example.springbootesprit.entities.TunisianGovernorate;
import com.example.springbootesprit.entities.TypeFoyer;

import java.util.List;
import java.util.Map;

public interface IFoyerService {
    List<Foyer> retrieveAllFoyers();
    Foyer addFoyer (Foyer f);
    Foyer updateFoyer (Foyer f);
    Foyer retrieveFoyer (long idFoyer);
    void archiverFoyer (long idFoyer);
    List<Foyer> getAllFoyersByGrouvenerat(TunisianGovernorate grouvenerat);
    Long countFoyersByGrouvenerat(TunisianGovernorate grouvenerat);

    Map<TypeFoyer, Long> countFoyersByType();
    List<Foyer> getFoyersByType(TypeFoyer type);
    void removeFoyer( long idFoyer);
}
