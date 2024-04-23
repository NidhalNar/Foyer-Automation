// all-reservations.component.ts
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/Reservation';
import { ReservationService } from 'src/app/services/serviceReservation/reservation.service';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.css']
})
export class AllReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  reservationsNonValides: Reservation[] = [];
  currentYear: number = new Date().getFullYear(); // Add this line

  constructor(private _reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadReservationsNonValides();
    this._reservationService.findAllReservations().subscribe(
      (d) => {
        console.log(d);
        this.reservations = d;
      }
    );
  }

  loadReservationsNonValides() {
    this._reservationService.getReservationsNonValides().subscribe(
      (reservations) => {
        this.reservationsNonValides = reservations;
      },
      (error) => {
        console.error('Erreur lors du chargement des réservations non valides :', error);
      }
    );
  }

  validateReservation(idReservation: number) {
    this._reservationService.validateReservation(idReservation).subscribe(
      (validatedReservation) => {
        console.log('Réservation validée avec succès :', validatedReservation);

        this.loadReservationsNonValides();
        this.reservations = this.reservations.map(reservation => {
          if (reservation.idReservation === idReservation) {
            reservation.estValide = true;
          }
          return reservation;
        });
      },
      (error) => {
        console.error('Erreur lors de la validation de la réservation :', error);
      }
    );
  }
}
