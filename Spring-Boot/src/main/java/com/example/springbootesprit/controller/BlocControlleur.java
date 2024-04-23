package com.example.springbootesprit.controller;

import com.example.springbootesprit.entities.Bloc;
import com.example.springbootesprit.entities.Foyer;
import com.example.springbootesprit.repositories.ChambreRepository;
import com.example.springbootesprit.service.IBlocService;
import com.example.springbootesprit.service.IFoyerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://192.168.43.129:4200")
@RestController
@AllArgsConstructor
@RequestMapping("/blocc")
public class BlocControlleur {

    IBlocService blocc;
    IFoyerService foyer;
    ChambreRepository chambree;


    @GetMapping("/retrieve-all-bloc")
    public List<Bloc> getBloc() {
        List<Bloc> listBloc = blocc.retrieveAllBloc();
        return listBloc;

    }


    @GetMapping("/retrieve-bloc/{bloc-id}")
    public Bloc retrieveBloc(@PathVariable("bloc-id") Long idBloc) {
        return blocc.retrieveBloc(idBloc);

    }
/*

    @PostMapping("/add-bloc")
    public Bloc addBloc(@RequestBody Bloc b) {
        Bloc bloc = blocc.addBloc(b);
        return bloc;
    }

 */


/*

    @DeleteMapping("/remove-bloc/{bloc-id}")
    public void removeBloc(@PathVariable("bloc-id") Long idBloc) {
        blocc.removeBloc(idBloc);
    }
    */




    /*
    @DeleteMapping("/remove-bloc/{bloc-id}")
    public ResponseEntity<String> removeBloc(@PathVariable("bloc-id") Long idBloc) {
        try {
            blocc.removeBloc(idBloc);
            return new ResponseEntity<>("Le bloc a été supprimé avec succès.", HttpStatus.OK);
        } catch (Exception e) {
            // Log or return debug information about the exception
            return new ResponseEntity<>("Une erreur s'est produite lors de la suppression du bloc.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
*/

    @PutMapping("/update-bloc")
    public Bloc updateBloc(@RequestBody Bloc b) {
        Bloc bloc = blocc.updateBloc(b);
        return bloc;
    }



    @PutMapping("/affecter-chambres/{nomBloc}")
    public ResponseEntity<?> affecterChambresABloc(@PathVariable("nomBloc") String nomBloc, @RequestBody List<Long> numChambre) {
        Bloc bloc = blocc.affecterChambresABloc(numChambre, nomBloc);
        if (bloc != null) {
            return new ResponseEntity<>(bloc, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Le bloc n'a pas été trouvé.", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/addFoyerEtBlocs")
    @ResponseBody
    public Foyer addFoyerEtBlocs(@RequestBody Foyer foyer){
        Foyer foyerr = blocc.addBlocWithFoyer(foyer);
        return  foyerr;
    }


    @DeleteMapping("/remove-foyer-from-bloc/{bloc-id}/{foyer-id}")
    public ResponseEntity<String> removeFoyerFromBloc(@PathVariable("bloc-id") Long blocId, @PathVariable("foyer-id") Long foyerId) {
        try {
            blocc.removeFoyerFromBloc(blocId, foyerId);
            return new ResponseEntity<>("Le foyer a été supprimé du bloc avec succès.", HttpStatus.OK);
        } catch (Exception e) {
            // Log or return debug information about the exception
            return new ResponseEntity<>("Une erreur s'est produite lors de la suppression du foyer du bloc.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/remove-bloc/{bloc-id}")
    public ResponseEntity<Map<String, String>> removeBloc(@PathVariable("bloc-id") Long idBloc) {
        try {
            blocc.removeBloc(idBloc);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Le bloc a été supprimé avec succès.");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (ResponseStatusException e) {
            // Log or return debug information about the exception
            return new ResponseEntity<>(Collections.singletonMap("error", e.getReason()), e.getStatusCode());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addBloc(@RequestBody Bloc bloc) {
        try {
            // Appeler la méthode addBloc du service
            Bloc addedBloc = blocc.addBloc(bloc);
            return new ResponseEntity<>(addedBloc, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Capturer l'exception si la capacité n'est pas valide ou si le nom du bloc existe déjà
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Capturer d'autres exceptions
            return new ResponseEntity<>("Erreur interne du serveur : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

/*
    @GetMapping("/calculate-capacity")
    public ResponseEntity<Long> calculateCapacity(@RequestParam Typechambre typeChambre, @RequestParam Long blocId) {
        // Obtenez le bloc en fonction de l'ID passé en paramètre
        Bloc bloc = blocc.retrieveBloc(blocId);

        // Obtenez la liste des chambres du bloc en utilisant le repository
        List<Chambre> chambresDuBloc = chambree.findByBloc_IdBloc(blocId);

        // Appelez la méthode de calcul de capacité avec le type de chambre et la liste de chambres
        Long capaciteTotale = blocc.calculerCapaciteTotale(typeChambre, chambresDuBloc);

        return new ResponseEntity<>(capaciteTotale, HttpStatus.OK);
    }
*/







