package com.example.springbootesprit.controller;

import com.example.springbootesprit.entities.Chambre;
import com.example.springbootesprit.entities.Evaluation;
import com.example.springbootesprit.entities.Typechambre;
import com.example.springbootesprit.service.IBlocService;
import com.example.springbootesprit.service.IchambreService;
import com.itextpdf.text.DocumentException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://192.168.43.129:4200")
@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/chambre")

public class ChambreControleur {
    IchambreService chambree;
    IBlocService blocc;




    @PostMapping("/ajouter")
    public ResponseEntity<String> ajouterChambre(@RequestBody Chambre chambre) {
        try {
            // Appelez la méthode saveChambre du service pour sauvegarder la chambre avec validation
            Chambre nouvelleChambre = chambree.saveChambre(chambre);
            return new ResponseEntity<>("Chambre ajoutée avec succès.", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Gérez les erreurs de validation ici
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public List<Chambre> retrieveAllChambre() {
        log.info("Calling getAllChambres method");
        List<Chambre> listChambres = chambree.retrieveAllChambre();
        log.info("Number of chambres retrieved: {}", listChambres.size());
        return listChambres;
    }



    @GetMapping("/retrieve-chambre/{chambre-id}")
    public Chambre retrieveChambre(@PathVariable("chambre-id") Long idChambre) {
        return chambree.retrieveChambre(idChambre);

    }

    @PostMapping("/add-chambre")
    public Chambre addChambre(@RequestBody Chambre c) {
        Chambre chambre = chambree.addchambre(c);

        return chambre;
    }


    @DeleteMapping("/supprimer/{idChambre}")
    public ResponseEntity<String> supprimerChambre(@PathVariable Long idChambre) {
        try {
            // Appelez la méthode removeChambre du service pour supprimer la chambre avec validation
            chambree.removeChambre(idChambre);
            return new ResponseEntity<>("Chambre supprimée avec succès.", HttpStatus.OK);
        } catch (RuntimeException e) {
            // Gérez les erreurs de validation ici
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update-chambre")
    public Chambre updateChambre(@RequestBody Chambre c) {
        Chambre chambre= chambree.updateChambre(c);
        return chambre;
    }


    @GetMapping("/chambres/{nomBloc}")
    public List<Chambre> getChambresParNomBloc(@PathVariable String nomBloc) {
        return chambree.getChambresParNomBloc(nomBloc);
    }
    @GetMapping("/bloc/{idBloc}/chambres/count")
    public long countChambresByTypeAndBloc(
            @PathVariable long idBloc,
            @RequestParam("type") Typechambre type
    ) {
        return chambree.nbChambreParTypeEtBloc(type, idBloc);
    }

    @PostMapping("/{idChambre}/evaluations")
    public ResponseEntity<Chambre> ajouterEvaluation(
            @PathVariable("idChambre") Long idChambre,
            @RequestBody Evaluation evaluation) {
        Chambre chambre = chambree.ajouterEvaluation(idChambre, evaluation);
        return new ResponseEntity<>(chambre, HttpStatus.OK);
    }

    @GetMapping("/generatePdf/{idBloc}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable Long idBloc) throws DocumentException {
        byte[] pdfBytes = chambree.genererPDFChambresByBloc(idBloc);  // Appel de la méthode du service

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        headers.setContentDispositionFormData("attachment", "liste_chambres.pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @GetMapping(value = "/statistiques", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Map<String, Object>>> getStatistiqueBlocs() {
        List<Map<String, Object>> statistiques = chambree.getStatistiqueBlocs();
        return new ResponseEntity<>(statistiques, HttpStatus.OK);
    }

    @GetMapping("/well-rated")
    public List<Evaluation> getWellRatedEvaluations() {
        return chambree.getWellRatedEvaluations();
    }

    @GetMapping("/not-well-rated")
    public List<Evaluation> getNotWellRatedEvaluations() {
        return chambree.getNotWellRatedEvaluations();
    }



    @GetMapping("/{idChambre}")
    public ResponseEntity<?> getEvaluationByChambreId(@PathVariable Long idChambre) {
        Evaluation evaluation = chambree.getEvaluationByChambreId(idChambre);

        if (evaluation != null) {
            return new ResponseEntity<>(evaluation, HttpStatus.OK);
        } else {
            String errorMessage = "Pas d'évaluation pour la chambre avec l'ID : " + idChambre;
            return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{idChambre}/Chambres")
    public ResponseEntity<List<Chambre>> getReservationsForChambreBetweenDates(
            @PathVariable Long idChambre,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateDebut,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateFin) {

        List<Chambre> chambre = chambree.getReservationsForChambreBetweenDates(idChambre, dateDebut, dateFin);

        return new ResponseEntity<>(chambre, HttpStatus.OK);
    }


}


