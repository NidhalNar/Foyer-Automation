package com.example.springbootesprit.controller;


import com.example.springbootesprit.Dtos.FoyerDTO;
import com.example.springbootesprit.entities.Foyer;
import com.example.springbootesprit.entities.TunisianGovernorate;
import com.example.springbootesprit.entities.TypeFoyer;
import com.example.springbootesprit.service.IFoyerService;
import com.example.springbootesprit.service.IUniversiteService;
import com.example.springbootesprit.service.QRCodeService;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping("/foyer")
@CrossOrigin(origins = "http://192.168.43.129:4200")
public class FoyerController {
    IFoyerService foyerService;
    IUniversiteService universiteService;

    @Autowired
    private QRCodeService qrCodeService;

    @GetMapping("/retrieveAllFoyers")
    public List<Foyer> retrieveAllFoyers() {
        return foyerService.retrieveAllFoyers();
    }

    
        @PostMapping("addFoyer2")
        public Foyer addFoyer(@RequestBody Foyer f) {

            return  foyerService.addFoyer(f);
        }
    
    @PostMapping("addFoyer")
    public ResponseEntity<Foyer> addFoyer(@RequestBody FoyerDTO universiteDTO) {
        Foyer universite = convertDTOToUniversite(universiteDTO);

        Foyer addedUniversite = foyerService.addFoyer(universite);

        return new ResponseEntity<>(addedUniversite, HttpStatus.CREATED);
    }
    private Foyer convertDTOToUniversite(FoyerDTO universiteDTO) {
        Foyer universite = new Foyer();
        universite.setNomFoyer(universiteDTO.getNomFoyer());
        // Ajoutez d'autres champs en fonction de votre modèle Universite

        return universite;
    }

    
        @PutMapping("updateFoyer2")
        public Foyer updateFoyer(@RequestBody Foyer f) {

            return foyerService.updateFoyer(f);
        }
    @PutMapping("updateFoyer")
    public ResponseEntity<Foyer> updateUniversite(@RequestBody FoyerDTO universiteDTO) {
        // Logique de mise à jour de l'université avec l'identifiant id
        Foyer universite = convertDTOToUniversite(universiteDTO);
        Foyer updatedUniversite = foyerService.updateFoyer(universite);
        return ResponseEntity.ok(updatedUniversite);
    }

    @GetMapping("/retrieveFoyer/{foyer-id}")
    public ResponseEntity<Foyer> retrieveFoyer(@PathVariable("foyer-id") Long idFoyer) {

        return ResponseEntity.ok(foyerService.retrieveFoyer(idFoyer));
    }

    @DeleteMapping("/removeFoyer/{foyer-id}")
    void removeFoyer(@PathVariable("foyer-id") Long idFoyer) {
        foyerService.removeFoyer(idFoyer);
    }

    @DeleteMapping("/archiverFoyer/{foyer-id}")
    void archiverFoyer(@PathVariable("foyer-id") Long idFoyer) {
        foyerService.archiverFoyer(idFoyer);
    }

    @GetMapping("/qrcode")
    public void generateQRCode(HttpServletResponse response,
                               @RequestParam String text,
                               @RequestParam(defaultValue = "350") int width,
                               @RequestParam(defaultValue = "350") int height) throws Exception {
        BufferedImage image = qrCodeService.generateQRCode(text, width, height);
        ServletOutputStream outputStream = response.getOutputStream();
        ImageIO.write(image, "png", outputStream);
        outputStream.flush();
        outputStream.close();
    }

    @GetMapping("/retrieve-all-type")
    @ResponseBody
    public TypeFoyer[] getDepartments() {
        return TypeFoyer.values();
    }


    @GetMapping("/retrieveAllFoyers/byGrouvenerat/{grouvenerat}")
    public List<Foyer> getAllFoyersByGrouvenerat(@PathVariable TunisianGovernorate grouvenerat) {
        return foyerService.getAllFoyersByGrouvenerat(grouvenerat);
    }


    @GetMapping("/countByGrouvenerat")
    public ResponseEntity<Map<TunisianGovernorate, Long>> countFoyersByGrouvenerat() {
        Map<TunisianGovernorate, Long> counts = new EnumMap<>(TunisianGovernorate.class);

        for (TunisianGovernorate gouvernorat : TunisianGovernorate.values()) {
            Long count = foyerService.countFoyersByGrouvenerat(gouvernorat);
            counts.put(gouvernorat, count);
        }

        return new ResponseEntity<>(counts, HttpStatus.OK);
    }


    @GetMapping("/countByGrouveneratNombre")
    public ResponseEntity<ArrayList<Long>> countFoyersByGrouveneratNombre() {
        ArrayList<Long> counts = new ArrayList<>();

        for (TunisianGovernorate gouvernerat : TunisianGovernorate.values()) {
            Long count = foyerService.countFoyersByGrouvenerat(gouvernerat);
            counts.add(count);
        }

        return new ResponseEntity<>(counts, HttpStatus.OK);
    }


    //http://localhost:8099/foyer/foyer/byType/HOMMES
    @GetMapping("/byType/{type}")
    public ResponseEntity<List<Foyer>> getFoyersByType(@PathVariable TypeFoyer type) {
        List<Foyer> foyers = foyerService.getFoyersByType(type);

        if (!foyers.isEmpty()) {
            return new ResponseEntity<>(foyers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/countByType")
    public ResponseEntity<Map<TypeFoyer, Long>> countFoyersByType() {
        Map<TypeFoyer, Long> counts = foyerService.countFoyersByType();

        if (!counts.isEmpty()) {
            return new ResponseEntity<>(counts, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
