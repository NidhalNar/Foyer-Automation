package com.example.springbootesprit.controller;

import com.example.springbootesprit.entities.Chambre;
import com.example.springbootesprit.entities.Etudiant;
import com.example.springbootesprit.entities.Reservation;
import com.example.springbootesprit.repositories.ChambreRepository;
import com.example.springbootesprit.repositories.EtudiantRepository;
import com.example.springbootesprit.service.IEtudiantService;
import com.example.springbootesprit.utils.ExportExcelService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream ;
import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping("/etudiant")
@CrossOrigin(origins = "http://192.168.43.129:4200")
public class EtudiantControlleur {
    IEtudiantService etudiantService;
    ExportExcelService exportExcelService;

    EtudiantRepository etudiantRepository;
    ChambreRepository chambreRepository;

    @GetMapping("/retrieve-all-etudiants")
    public List<Etudiant> getEtudiants() {
        List<Etudiant> listEtudiants = etudiantService.retrieveAllEtudiants();
        return listEtudiants;}

    @GetMapping("/retrieve-etudiant/{etudiant-id}")
    public Etudiant retrieveEtudiant(@PathVariable("etudiant-id") Long etudiantId) {
        return etudiantService.retrieveEtudiant(etudiantId);
    }

    @DeleteMapping("/remove-etudiant/{etudiant-id}")
    public void removeEtudiant(@PathVariable("etudiant-id") Long etudiantId) {
        etudiantService.removeEtudiant(etudiantId);
    }
    @PutMapping("/update-etudiant")
    public Etudiant updateEtudiant(@RequestBody Etudiant e) {
        Etudiant etudiant= etudiantService.updateEtudiant(e);
        return etudiant;
    }
    @PostMapping("/add-etudiant")
    public Etudiant addEtudiant(@RequestBody Etudiant e) {
        Etudiant etudiant = etudiantService.addEtudiant(e);
        return etudiant;
    }
    @GetMapping("/reservations/{idEtudiant}")
    public ResponseEntity<Set<Chambre>> getChambresForEtudiant(@PathVariable Long idEtudiant) {
        Optional<Etudiant> optionalEtudiant = etudiantRepository.findById(idEtudiant);

        if (optionalEtudiant.isPresent()) {
            List<Reservation> reservations = optionalEtudiant.get().getReservation();

            // Utilisez ces réservations pour récupérer les chambres associées
            Set<Chambre> chambres = new HashSet<>();
            for (Reservation reservation : reservations) {
                List<Chambre> chambresDeLaReservation = chambreRepository.findByReservationsIdReservation(reservation.getIdReservation());
                chambres.addAll(chambresDeLaReservation);
            }

            return new ResponseEntity<>(chambres, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    //*******************************************Excel************************************
    @GetMapping("/export-excel")
    public ResponseEntity<byte[]> exportStudentsToExcel() {
        try {

            List<Etudiant> students = etudiantService.retrieveAllEtudiants();
            ByteArrayOutputStream excelStream = exportExcelService.generateStudentsExcelReport(students);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "students.xlsx");
            return ResponseEntity.ok().headers(headers).body(excelStream.toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            // Handle errors here, for example, by returning an HTTP error response
            return ResponseEntity.status(500).body(null);
        }
    }
    //*******************************************Pagination************************************
    @GetMapping("/page")
    public ResponseEntity<List<Etudiant>> getPagination(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "5") Integer pageSize
    ){
        List<Etudiant> list = etudiantService.getEtudiantsPag(pageNo, pageSize);
        return new ResponseEntity<List<Etudiant>>(list, new HttpHeaders(), HttpStatus.OK);

    }
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Long>> getUserStatistics() {
        long totalEtudiants = etudiantService.countTotalEtudiants();
        long EtudiantsWithReservations = etudiantService.countEtudiantsWithReservations();

        Map<String, Long> statistics = new HashMap<>();
        statistics.put("totalEtudiants", totalEtudiants);
        statistics.put("etudiantsWithReservations", EtudiantsWithReservations);

        return ResponseEntity.ok(statistics);
    }



}
