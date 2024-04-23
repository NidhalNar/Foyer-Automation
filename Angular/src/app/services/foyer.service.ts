import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {

  baseUrl = 'http://192.168.43.129:8084/foyer/foyer'
  constructor(
    private http: HttpClient
  ) { }

  add(data: any) {
    return this.http.post(`${this.baseUrl}/addFoyer2`, data)
  }

  get() {
    return this.http.get(`${this.baseUrl}/retrieveAllFoyers`)
  }

  edit(data: any) {
    return this.http.put(`${this.baseUrl}/updateFoyer2`, data)
  }

  delete(id: any) {
    return this.http.delete(`${this.baseUrl}/removeFoyer/${id}`)
  }
  getQRCodeImage(data: any): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/qrcode?text=${data}`, { responseType: 'blob' });
  }

  getAllTypeFoyer() {
    return this.http.get(`${this.baseUrl}/retrieve-all-type`)

  }

  getFoyersByGrouvenerat(gouv: any) {
    return this.http.get(`${this.baseUrl}/retrieveAllFoyers/byGrouvenerat/${gouv}`)
  }

  getFoyersByType(type: any) {
    return this.http.get(`${this.baseUrl}/byType/${type}`)
  }

  countByGrouvenerat() {
    return this.http.get(`${this.baseUrl}/countByGrouvenerat`)
  }
  countByGrouveneratNombre() {
    return this.http.get(`${this.baseUrl}/countByGrouveneratNombre`)
  }

  countByType() {
    return this.http.get(`${this.baseUrl}/countByType`)
  }
}
