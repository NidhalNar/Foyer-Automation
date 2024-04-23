import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Etudiant } from 'src/app/models/Etudiant';
import { Observable, catchError, throwError } from 'rxjs';
import { Chambre } from 'src/app/models/Chambre';
import { UserDetails } from 'src/app/models/userDetails';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private UserUrl = 'http://192.168.43.129:8084/foyer/user/';
  constructor(private _httpClient: HttpClient) { }
  
  loadUserProfileByEmail(email: string): Observable<UserDetails> {
    const params = new HttpParams().set('email', email);
    return this._httpClient.get<UserDetails>(`${this.UserUrl}/retrieve-user-by-email`, { params });
  }

  removeUser(userId: number): Observable<any> {
    return this._httpClient.delete(`${this.UserUrl}remove-user/${userId}`);
  }

  exportToExcel(): Observable<HttpResponse<Blob>> {
    const url = `${this.UserUrl}export-excel`;

    return this._httpClient.get(url, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  exportUserToExcel(userId: number): Observable<HttpResponse<Blob>> {
    const url = `${this.UserUrl}export-excel/${userId}`;

    return this._httpClient.get(url, {
      responseType: 'blob',
      observe: 'response'
    });
  }
  getPaginatedUsers(pageNo: number, pageSize: number): Observable<UserDetails[]> {
    const url = `${this.UserUrl}page?pageNo=${pageNo}&pageSize=${pageSize}`;
    return this._httpClient.get<UserDetails[]>(url);
  }

  getChambresForUser(id: number): Observable<Chambre[]> {
    const url = `${this.UserUrl}reservations/${id}`;
    return this._httpClient.get<Chambre[]>(url);
  }

  getEtudiantStatistics(): Observable<any> {
    const url = `${this.UserUrl}statistics`;
    return this._httpClient.get(url);
  }
  getUsers(): Observable<UserDetails[]> {
    const url = `${this.UserUrl}retrieve-all-users`;
    return this._httpClient.get<UserDetails[]>(url);
  }
}    
