import { Component } from '@angular/core';
import { RegisterRequest } from '../../models/register-request';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationResponse } from 'src/app/models/authentication-response';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  message : string | undefined

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  registerUser() {
    this.message = '';
    this.authService.register(this.registerRequest)
      .subscribe({
        next: (response) => {
          this.message = ' registered successfully!';

          setTimeout(() => {
            this.router.navigate(['login']);
          },);
        },
      });
  }
}

