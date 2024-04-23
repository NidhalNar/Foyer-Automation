import { Component, OnInit } from '@angular/core';

import {ProfilService} from "../../services/profil.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userDetails: any;
  userId: any;
  message: string | undefined;


  constructor(
    private profilService: ProfilService,
    private authService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {

    this.loadUserDetailsByEmail();
  }
  updateProfile(): void {

    this.profilService.updateUserProfile(this.userDetails).subscribe(
      response => {
        console.log('Profile updated successfully', response);
        this.message = 'Profil mis à jour avec succès';
      },
      error => {
        console.log('Error updating profile', error);
      }
    );
  }

  loadUserDetailsByEmail(): void {
    let userEmail: any = localStorage.getItem('user-email');
    this.profilService.loadUserProfileByEmail(userEmail).subscribe(
      (res) => {
        this.userDetails = res;

      },
    );
  }

  supprimerProfil() {
    const userEmail = this.authService.getCurrentUserEmail();

    if (userEmail) {
      this.profilService.deleteProfileByEmail(userEmail).subscribe(
        () => {
          console.log('Profil utilisateur supprimé avec succès');

          alert('Profil supprimé avec succès');
          this.authService.removeCurrentUserEmail();
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erreur lors de la suppression du profil utilisateur', error);
          alert('Erreur lors de la suppression du profil utilisateur');
        }
      );
    }
  }
 
    afficherNouveauCard = false;
    fermerNouveauCard() {
      this.router.navigate(['/welcome']); // Remplacez '/welcome' par l'URL de la page que vous souhaitez afficher
  }
    
}