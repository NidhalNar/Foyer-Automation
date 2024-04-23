package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.Bloc;
import com.example.springbootesprit.entities.Chambre;
import com.example.springbootesprit.entities.Foyer;
import com.example.springbootesprit.entities.Typechambre;
import com.example.springbootesprit.repositories.BlocRepository;
import com.example.springbootesprit.repositories.ChambreRepository;
import com.example.springbootesprit.repositories.FoyerRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BlocService implements IBlocService{
    @Autowired
    private final BlocRepository blocrepo;
    @Autowired
    private final ChambreRepository chambreRepository;
    @Autowired
    private  final FoyerRepository foyerrepository;

    @Override
    public List<Bloc> retrieveAllBloc() {
        return blocrepo.findAll();
    }


/*
    @Override
    public Bloc addBloc(Bloc b) {
        return blocrepo.save(b);
    }
*/


    @Override
    public Bloc addBloc(Bloc b) {
        // Assurez-vous que le foyer est persistant avant de sauvegarder le bloc
        Foyer foyer = b.getFoyer();
        if (foyer != null) {
            if (foyer.getIdFoyer() == null) {
                // Si le foyer n'est pas persistant, sauvegardez-le
                foyer = foyerrepository.save(foyer);
            }

            // Vérifiez si le nom du bloc est unique dans le foyer
            if (blocrepo.existsByNomBlocAndFoyer(b.getNomBloc(), foyer)) {
                throw new IllegalArgumentException("Le nom du bloc existe déjà pour ce foyer. Veuillez choisir un nom unique.");
            }

            // Mettez à jour le foyer du bloc avec le foyer persistant
            b.setFoyer(foyer);
        }

        // Sauvegardez le bloc
        return blocrepo.save(b);
    }


    // Autres méthodes du service...



    private Long calculerCapaciteTotale(Typechambre typeChambre, List<Chambre> chambres) {
        Long capaciteTotale = 0L;

        for (Chambre chambre : chambres) {
            if (chambre.getTypechambre() == typeChambre) {
                capaciteTotale += chambre.getBloc().getCapciteBloc();
            }
        }

        return capaciteTotale;
    }



    @Override
    public Bloc updateBloc(Bloc b) {
        return blocrepo.save(b);
    }

    @Override
    public Bloc retrieveBloc(Long idBloc) {
        return blocrepo.findById(idBloc).get();
    }
/*
    @Override
    public void removeBloc(Long idBloc) {
        blocrepo.deleteById(idBloc);
    }

 */

    @Override
    public Bloc affecterChambresABloc(List<Long> numChambre, String nomBloc) {
        Bloc bloc = blocrepo.findByNomBloc(nomBloc);
        if (bloc != null) {
            for (Long numeroChambre : numChambre) {
                Chambre chambre = chambreRepository.findByNumerochambre(numeroChambre);
                if (chambre != null) {
                    chambre.setBloc(bloc);
                    chambreRepository.save(chambre);
                }
            }
            return blocrepo.save(bloc);
        }
        return null; // Gérer le cas où le bloc n'existe pas
    }

    @Override
    public Foyer addBlocWithFoyer(Foyer foyer) {
        //sauvgarder  l'objet fils foyer
        Foyer foyerr =foyerrepository.save(foyer);
        //parcourir la liste de bloc (parent)
        foyerr.getBlocs().forEach(bloc -> {
            //affecter le child foyer au parent bloc et sauvgarder parent
            bloc.setFoyer(foyerr);
            blocrepo.save(bloc);
        });
        return foyerr;
    }
    @Override
    public void removeFoyerFromBloc(Long blocId, Long foyerId) {
        Optional<Bloc> optionalBloc = blocrepo.findById(blocId);
        if (optionalBloc.isPresent()) {
            Bloc bloc = optionalBloc.get();

            // Supprimer le foyer du bloc si le foyer correspond à celui spécifié
            if (bloc.getFoyer() != null && bloc.getFoyer().getIdFoyer().equals(foyerId)) {
                bloc.setFoyer(null);

                // Enregistrez les modifications dans le repository
                blocrepo.save(bloc);
            } else {
                // Gérer le cas où le foyer ne correspond pas à celui spécifié
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le foyer avec l'ID " + foyerId + " n'est pas associé au bloc avec l'ID " + blocId + ".");
            }
        } else {
            // Gérer le cas où le bloc n'est pas trouvé
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Le bloc avec l'ID " + blocId + " n'a pas été trouvé.");
        }
    }


    @Override
    public void removeBloc(Long blocId) {
        Optional<Bloc> optionalBloc = blocrepo.findById(blocId);
        if (optionalBloc.isPresent()) {
            Bloc bloc = optionalBloc.get();

            // Vérifier s'il y a des chambres associées à ce bloc
            Set<Chambre> chambres = bloc.getChambres();
            if (chambres != null && !chambres.isEmpty()) {
                // Supprimer les chambres associées à ce bloc
                chambreRepository.deleteAll(chambres);
            }

            // Supprimer le bloc après avoir supprimé les chambres associées
            blocrepo.deleteById(blocId);
        } else {
            // Gérer le cas où le bloc n'est pas trouvé
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Le bloc avec l'ID " + blocId + " n'a pas été trouvé.");
        }
    }
/*

    public Long calculerCapaciteTotale(Typechambre typeChambre, List<Chambre> chambres) {
        Long capaciteTotale = 0L;

        for (Chambre chambre : chambres) {
            if (chambre.getTypechambre() == typeChambre) {
                capaciteTotale += chambre.getBloc().getCapciteBloc();
            }
        }

        return capaciteTotale;
    }

*/
}





