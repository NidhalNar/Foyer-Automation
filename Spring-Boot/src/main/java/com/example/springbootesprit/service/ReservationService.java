package com.example.springbootesprit.service;

import com.example.springbootesprit.entities.Chambre;
import com.example.springbootesprit.entities.Etudiant;
import com.example.springbootesprit.entities.Reservation;
import com.example.springbootesprit.entities.User;
import com.example.springbootesprit.repositories.ChambreRepository;
import com.example.springbootesprit.repositories.EtudiantRepository;
import com.example.springbootesprit.repositories.ReservationRepository;
import com.example.springbootesprit.repositories.UserRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor

public class ReservationService implements IReservationService {

    ReservationRepository reservationRepository;
    EtudiantRepository etudiantRepository;
    ChambreRepository chambreRepository;
    UserRepository userRepository;
    private static final String ACCOUNT_SID = "ACb9a8c651093739d767b11277d17c4ab0";
    private static final String AUTH_TOKEN = "db55be7730cba3958b99c107e958292b";

    @Override
    public List<Reservation> retrieveAllReservation() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation addReservation(Reservation r) {
        return reservationRepository.save(r);
    }

    @Override
    public Reservation updateReservation(Reservation r) {
        return reservationRepository.save(r);
    }

    @Override
    public Optional<Reservation> retrieveReservation(Long idReservation) {
        return reservationRepository.findById(idReservation);
    }

    @Override
    public void removeReservation(Long idReservation) {
        reservationRepository.deleteById(idReservation);

    }

    @Override
    public List<Reservation> getReservationsNonValides() {
        return reservationRepository.findByEstValideFalse();
    }

    //etudiant
    @Override
    public Reservation validateReservation(Long idReservation) {
        Reservation reservation = reservationRepository.findById(idReservation).orElse(null);
        if (reservation != null) {
            reservation.setEstValide(true);
            reservation = reservationRepository.save(reservation);
            sendValidationSMS(reservation);
            return reservation;
        }
        return null;
    }

    private void sendValidationSMS(Reservation reservation) {
        Date anneeUniversitaire = reservation.getAnneeUniversitaire();
        String phoneNumber = "+21628615917";

        if (reservation.getEtud() != null && !reservation.getEtud().isEmpty()) {
            Etudiant etudiant = reservation.getEtud().iterator().next();
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
            Message message = Message.creator(new PhoneNumber(phoneNumber),
                    new PhoneNumber("+14139613726"),
                    "Votre réservation avec l'ID " + reservation.getIdReservation() + " pour l'année universitaire du "
                            + anneeUniversitaire +
                            " a été validée par l'administrateur pour l'étudiant: " + etudiant.getFirstname() + " " + etudiant.getLastname()).create();
            System.out.println(message.getSid());
            System.out.println("Un SMS Twilio de validation de réservation a été envoyé.");
        } else {
            System.out.println("La collection 'etud' est vide pour la réservation avec l'ID " + reservation.getIdReservation());
            System.out.println("Aucun SMS Twilio envoyé car la collection 'etud' est vide.");
        }
    }





    //user
    @Override
    public Reservation makeUserReservationChambre(Long idChambre, String email, Reservation reservation) {
        Chambre chambre = chambreRepository.findById(idChambre).orElse(null);
        User user = userRepository.findByEmail(email).orElse(null);

        if (chambre != null && user != null) {
            if (user.getReservation() != null && !user.getReservation().isEmpty()) {
                throw new RuntimeException("L'utilisateur a déjà une réservation.");
            }
            if (chambre.getReservations() != null && !chambre.getReservations().isEmpty()) {
                throw new RuntimeException("La chambre est déjà réservée.");
            }
            if (chambre.getTypechambre().equals("DOUBLE") || chambre.getTypechambre().equals("TRIPLE")) {
                List<User> existingUsers = userRepository.findAllByGenderAndIdNot(user.getGender(), user.getId());
                List<User> roommates = existingUsers.stream().limit(2).collect(Collectors.toList());

                // Ensure that existing roommates are in the managed state
                roommates = userRepository.saveAll(roommates);

                reservation.setRoommates(new HashSet<>(roommates));
            }

            Set<User> users = new HashSet<>();
            users.add(user);

            // Save the user using the repository to ensure it is in the managed state
            user = userRepository.save(user);

            reservation.setUser(users);

            // Save the reservation using the repository
            reservationRepository.save(reservation);

            chambre.getReservations().add(reservation);
            chambreRepository.save(chambre);

            user.getReservation().add(reservation);
            userRepository.save(user);

            return reservation;
        }

        return null;
    }



    @Override
    public Reservation validateReservationUser(Long idReservation) {
        Reservation reservation = reservationRepository.findById(idReservation).orElse(null);
        if (reservation != null) {
            reservation.setEstValide(true);
            reservation = reservationRepository.save(reservation);
            sendValidationSMSUser(reservation);
            return reservation;
        }
        return null;
    }

    private void sendValidationSMSUser(Reservation reservation) {
        Date anneeUniversitaire = reservation.getAnneeUniversitaire();
        String phoneNumber = "+21628615917";

        if (reservation.getUser() != null && !reservation.getUser().isEmpty()) {
            User user = reservation.getUser().iterator().next();
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
            Message message = Message.creator(new PhoneNumber(phoneNumber),
                    new PhoneNumber("+14139613726"),
                    "Votre réservation avec l'ID " + reservation.getIdReservation() + " pour l'année universitaire du "
                            + anneeUniversitaire +
                            " a été validée par l'administrateur pour l'étudiant: " + user.getFirstname() + " " + user.getLastname()).create();
            System.out.println(message.getSid());
            System.out.println("Un SMS Twilio de validation de réservation a été envoyé.");
        } else {
            System.out.println("La collection 'user' est vide pour la réservation avec l'ID " + reservation.getIdReservation());
            System.out.println("Aucun SMS Twilio envoyé car la collection 'user' est vide.");
        }
    }
}
