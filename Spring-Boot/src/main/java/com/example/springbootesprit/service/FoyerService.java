package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.Foyer;
import com.example.springbootesprit.entities.TunisianGovernorate;
import com.example.springbootesprit.entities.TypeFoyer;
import com.example.springbootesprit.repositories.BlocRepository;
import com.example.springbootesprit.repositories.FoyerRepository;
import com.example.springbootesprit.repositories.UniversiteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FoyerService implements IFoyerService {
    FoyerRepository foyerRepository;
    BlocRepository blocRepository;
    UniversiteRepository universiteRepository;


    @Override
    public List<Foyer> retrieveAllFoyers() {
        return foyerRepository.findAll();
    }


    @Override
    public List<Foyer> getAllFoyersByGrouvenerat(TunisianGovernorate grouvenerat) {
        return foyerRepository.findAllFoyersByGrouvenerat(grouvenerat);
    }
    @Override
    public Long countFoyersByGrouvenerat(TunisianGovernorate grouvenerat) {
        return foyerRepository.countFoyersByGrouvenerat(grouvenerat);
    }
    @Override
    public List<Foyer> getFoyersByType(TypeFoyer type) {
        return foyerRepository.findFoyersByType(type);
    }
    @Override
    public Map<TypeFoyer, Long> countFoyersByType() {
        List<Object[]> results = foyerRepository.countFoyersByType();

        return results.stream()
                .collect(Collectors.toMap(
                        arr -> (TypeFoyer) arr[0],
                        arr -> (Long) arr[1]
                ));
    }

    @Override
    public Foyer addFoyer(Foyer f) {
        return foyerRepository.save(f);
    }

    @Override
    public Foyer updateFoyer(Foyer f) {
        return foyerRepository.save(f);

    }

    @Override
    public Foyer retrieveFoyer(long idFoyer) {

        Optional<Foyer> foyer = foyerRepository.findById(idFoyer);

        return foyer.orElse(null);

    }

    @Override
    public void removeFoyer(long idFoyer) {
        foyerRepository.deleteById(idFoyer);
    }


    @Override
    public void archiverFoyer(long idFoyer) {

        throw new UnsupportedOperationException("Foyer archiving is not supported yet.");

    }


}