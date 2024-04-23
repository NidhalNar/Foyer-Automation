import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RegisterRequest} from "../models/register-request";
import {AuthenticationResponse} from "../models/authentication-response";
import { AuthenticationRequest } from '../models/authentication-request';
import {Observable, tap} from 'rxjs';
import {UserDetails} from "../models/userDetails";
import {ProfilService} from "./profil.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authBaseUrl: string = 'http://192.168.43.129:8084/foyer/api/v1/auth';
  private userId: any;

  constructor(
    private http: HttpClient,
    private profilService: ProfilService,
  ) {
  }

  register(
    registerRequest: RegisterRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.authBaseUrl}/register`, registerRequest);
  }

  login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.authBaseUrl}/authenticate`, authRequest)
      .pipe(
        tap((response: any) => {
          this.userId = response.token;
          console.log('response', response);
          localStorage.setItem('user-token', <string>response.token)
          localStorage.setItem('user-email', <string>response.email)

        })
      );
  }

  getCurrentUserEmail(): string | null {
    return localStorage.getItem('user-email');
  }

  removeCurrentUserEmail(): void {
    localStorage.removeItem('user-email');
  }


}
