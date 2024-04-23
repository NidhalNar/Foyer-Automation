import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/models/Reservation';
import { Etudiant } from 'src/app/models/Etudiant';
import { Chambre } from 'src/app/models/Chambre';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private getReservationUrl: string = "http://192.168.43.129:8084/foyer/reservation/";
  constructor(private _httpClient: HttpClient) { }

  public findAllReservations(): Observable<Reservation[]> {
    return this._httpClient.get<Reservation[]>(this.getReservationUrl + "retrieve-all-reservations");
  }

  public save(reservation: Reservation) {
    return this._httpClient.post<Reservation>(this.getReservationUrl + "add-reservation", reservation);
  }

  deleteReservation(idReservation: number): Observable<Object> {
    return this._httpClient.delete(this.getReservationUrl + (`remove-reservation/${idReservation}`));
  }
 
  getReservationsNonValides(): Observable<Reservation[]> {
    const url = `${this.getReservationUrl}reservations/non-valides`;
    return this._httpClient.get<Reservation[]>(url);
  }
  validateReservation(idReservation: number): Observable<Reservation> {
    const url = `${this.getReservationUrl}validate-reservation-user/${idReservation}`;
    return this._httpClient.put<Reservation>(url, {});
  }
  makeUserReservationChambre(idChambre: number, email: string, reservation: Reservation): Observable<any> {
    const url = `${this.getReservationUrl}make-user-reservation-chambre/${idChambre}/$${email}`;
    return this._httpClient.post(url, reservation);
  }


 
}
