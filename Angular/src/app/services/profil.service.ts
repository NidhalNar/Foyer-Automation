import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDetails} from "../models/userDetails";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private baseUrl: string = 'http://192.168.43.129:8084/foyer/user';
  userEmail: any;


  constructor(private http: HttpClient) {
    this.userEmail = localStorage.getItem("user-email")
  }

  loadUserProfileByEmail(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get(this.baseUrl + '/retrieve-user-by-email', {
      params
    })
  }


  deleteProfileByEmail(userEmail: string): Observable<any> {
    const url = `${this.baseUrl}/remove-user-by-email/${userEmail}`;
    return this.http.delete<any>(url);

  }

  updateUserProfile(newUserDetails: UserDetails): Observable<any> {
    if (!this.userEmail) {
      throw new Error('L\'e-mail de l\'utilisateur n\'est pas disponible');
    }

    const url = `${this.baseUrl}/update/${this.userEmail}`;
    console.log(this.userEmail);
    console.log(newUserDetails);
    return this.http.put(url, newUserDetails);
  }
}




