import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../models/authentication-request";
import {AuthenticationResponse} from "../../models/authentication-response";
import {Router} from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   
  authRequest: AuthenticationRequest = {email: '', password: ''};

  authResponse: AuthenticationResponse = {};
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  authenticate() 
  { this.errorMessage = ''; // Réinitialiser le message d'erreur 
  this.authService.login(this.authRequest) .subscribe({ next: (response) => { this.authResponse = response; if (!this.authResponse.mfaEnabled) { localStorage.setItem('token', response.accessToken as string); this.router.navigate(['welcome']); } }, error: (error) => { console.error(error); this.errorMessage = 'Email ou mot de passe incorrect.'; } }); }
 


}
