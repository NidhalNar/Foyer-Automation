import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foyer } from 'src/app/models/Foyer';
@Injectable({
  providedIn: 'root'
})
export class FoyerService {
  private apiUrl = 'http://192.168.43.129:8084/foyer/foyer';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getAllFoyers(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.apiUrl}/retrieveAllFoyers`);
   
  }

  addFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.post<Foyer>(`${this.apiUrl}/add-foyer`, foyer);
  }

  updateFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.put<Foyer>(`${this.apiUrl}/update-foyer`, foyer);
  }

  retrieveFoyer(idFoyer: number): Observable<Foyer> {
    return this.http.get<Foyer>(`${this.apiUrl}/retrieve-foyer/${idFoyer}`);
  }

  archiverFoyer(idFoyer: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeFoyer/${idFoyer}`);
  }
}
