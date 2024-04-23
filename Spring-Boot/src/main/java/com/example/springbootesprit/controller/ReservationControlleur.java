package com.example.springbootesprit.controller;

import com.example.springbootesprit.entities.Chambre;
import com.example.springbootesprit.entities.Etudiant;
import com.example.springbootesprit.entities.Reservation;
import com.example.springbootesprit.entities.User;
import com.example.springbootesprit.repositories.ChambreRepository;
import com.example.springbootesprit.service.IEtudiantService;
import com.example.springbootesprit.service.IReservationService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("/reservation")
@CrossOrigin(origins = "http://192.168.43.129:4200")


public class ReservationControlleur {
    IReservationService reservationService;
    IEtudiantService etudiantService;
    ChambreRepository chambreRepository;

    @Operation(summary = "Récupérer tous les reservations")
    @GetMapping("/retrieve-all-reservations")
    public List<Reservation> getRservations() {
        List<Reservation> listReservations = reservationService.retrieveAllReservation();
        return listReservations;
    }

    @Operation(summary = "Récupérer une reservation par ID")
    @GetMapping("/retrieve-reservation/{reservation-id}")
    public Optional<Reservation> retrieveReservation(@PathVariable("reservation-id") Long idReservation) {
        return reservationService.retrieveReservation(idReservation);
    }

    @Operation(summary = "Supprimer une reservation par ID")
    @DeleteMapping("/remove-reservation/{reservation-id}")
    public void removeReservation(@PathVariable("reservation-id") Long idReservation) {
        reservationService.removeReservation(idReservation);
    }

    @Operation(summary = "Mettre à jour une reservation")
    @PutMapping("/update-reservation")
    public Reservation updateReservation(@RequestBody Reservation r) {
        Reservation reservation = reservationService.updateReservation(r);
        return reservation;
    }

    @Operation(summary = "Ajouter une reservation")
    @PostMapping("/add-reservation")
    public Reservation addReservation(@RequestBody Reservation r) {
        Reservation reservation = reservationService.addReservation(r);
        return reservation;
    }
    @Operation(summary = "Reservation non validée")
    @GetMapping("/reservations/non-valides")
    public ResponseEntity<List<Reservation>> getReservationsNonValides() {
        List<Reservation> reservationsNonValides = reservationService.getReservationsNonValides();
        return new ResponseEntity<>(reservationsNonValides, HttpStatus.OK);
    }

    //etudiant
    @Operation(summary = "Etudiant :Validate Reservation ")
    @PutMapping("/validate-reservation/{idReservation}")
    public ResponseEntity<Reservation> validateReservation(@PathVariable Long idReservation) {
        Reservation validatedReservation = reservationService.validateReservation(idReservation);
        if (validatedReservation != null) {
            return new ResponseEntity<>(validatedReservation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Get Rservation d'une chambre")
    @GetMapping("/reservations/{idChambre}")
    public ResponseEntity<Set<Reservation>> getReservationsForChambre(@PathVariable Long idChambre) {
        Optional<Chambre> optionalChambre = chambreRepository.findById(idChambre);

        if (optionalChambre.isPresent()) {
            Set<Reservation> reservations = optionalChambre.get().getReservations();
            return new ResponseEntity<>(reservations, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    //user
    @Operation(summary = "User : Validate Reservation + SMS")
    @PutMapping("/validate-reservation-user/{idReservation}")
    public ResponseEntity<Reservation> validateReservationUser(@PathVariable Long idReservation) {
        Reservation validatedReservationUser = reservationService.validateReservationUser(idReservation);
        if (validatedReservationUser != null) {
            return new ResponseEntity<>(validatedReservationUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "User: Make Reservation d'une chambre ")
    @PostMapping("/make-user-reservation-chambre/{idChambre}/{email}")
    public ResponseEntity<Object> makeUserReservationChambre(
            @PathVariable Long idChambre,
            @PathVariable String email,
            @RequestBody Reservation reservation) {

        try {
            if (reservation.getUser() != null && !reservation.getUser().isEmpty()) {
                User user = reservation.getUser().iterator().next();
                if (user.getGender() == null) {
                    return new ResponseEntity<>("Le genre de l'étudiant doit être spécifié dans la réservation.", HttpStatus.BAD_REQUEST);
                }
            }
            Reservation newReservation = reservationService.makeUserReservationChambre(idChambre, email, reservation);
            if (newReservation != null) {
                return new ResponseEntity<>(newReservation, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Unable to make reservation. Check chambre and user.", HttpStatus.BAD_REQUEST);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
