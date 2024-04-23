package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.Bloc;
import com.example.springbootesprit.entities.Foyer;

import java.util.List;

public interface IBlocService {
    List<Bloc> retrieveAllBloc();

    Bloc addBloc(Bloc b);

    Bloc updateBloc(Bloc b);

    Bloc retrieveBloc(Long idBloc);

    //void removeBloc(Long idBloc);

    public Bloc affecterChambresABloc(List<Long> numChambre, String nomBloc);
    Foyer addBlocWithFoyer (Foyer foyer);
    public void removeFoyerFromBloc(Long blocId, Long foyerId);
    public void removeBloc(Long blocId);


}
