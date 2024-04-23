import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProfilService} from "../../services/profil.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {
  userDetails:any ;

  constructor(private router: Router,private profilService: ProfilService) { }
  ngOnInit(): void {
    this.loadUserDetailsByEmail();
  }
  redirectToProfile() {
    this.router.navigate(['/profil']);
  }
  logout(){
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-email');

    this .router.navigate(['/login']);
  }
  loadUserDetailsByEmail(): void {
    let userEmail: any = localStorage.getItem('user-email');
    this.profilService.loadUserProfileByEmail(userEmail).subscribe(
      (res) => {
        this.userDetails = res;
      },
      (error) => {
        console.error('Erreur lors du chargement du profil utilisateur : ', error);
      }
    );
  }
  navigateTochambres() {
    this.router.navigate(['/dashboard/ShowChambreUser']);
  }
  navigateToAccueil(){
    this.router.navigate(['/welcome']);


  }
  foyer(){
    this.router.navigate(['/welcome-foyer'])
  }
}