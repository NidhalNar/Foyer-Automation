import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  baseUrl = 'http://192.168.43.129:8084/foyer/universite'
  constructor(
    private http: HttpClient
  ) { }

  add(data: any) {
    return this.http.post(`${this.baseUrl}/addUniversity`, data)
  }

  getUniversite() {
    return this.http.get(`${this.baseUrl}/retrieveAllUniversities`)
  }

  getWhereFoyerIsNull() {
    return this.http.get(`${this.baseUrl}/allUniversitiesWhereFoyerIsNull`)
  }

  edit(data: any) {
    return this.http.put(`${this.baseUrl}/updateUniversity`, data)
  }

  delete(id: any) {
    return this.http.delete(`${this.baseUrl}/removeUniversity/${id}`)
  }

  affect(idFoyer : any , nomUn : any){
    return this.http.put(`${this.baseUrl}/affecterFoyerAUniversite/${idFoyer}/${nomUn}`, {})
  }

  getAllGourvernerats(){
    return this.http.get(`${this.baseUrl}/retrieve-all-gourvernerats`)
  }

  countByGrouvenerat(){
    return this.http.get(`${this.baseUrl}/countByGrouvenerat`)
  }
}
