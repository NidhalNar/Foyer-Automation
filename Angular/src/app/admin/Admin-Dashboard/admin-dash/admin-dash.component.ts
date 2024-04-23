import { Component  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent {
  constructor(private router: Router) { }

  navigateToAddChambre() {
    this.router.navigate(['/dashboard/add-chambre']);
  }
  
  navigateToListChambres() {
    this.router.navigate(['/dashboard/display-chambres']);
  }
  
  navigateToListReservations() {
    this.router.navigate(['/reservation', 'AllReservations']);
  }
  navigateToListEtudiantsAvecReservations() {
    this.router.navigate(['/etudiant', 'AllReservationsEtudiant']);
  }
  navigateToAddBloc() {
    this.router.navigate(['/bloc/add-bloc']);
  }
  navigateToShowBloc() {
    this.router.navigate(['/bloc/show-bloc']);
  }

  navigateToFoyer(){
    this.router.navigate(['/foyer/all']);

  }

  navigateToStat(){
    this.router.navigate(['/foyer/statistique']);

  }

  navigateToUniversity(){
    this.router.navigate(['/foyer/university']);

  }

  stayOnAdminPage() {
  }
  navigateTochart() {
    this.router.navigate(['/dashboard/chart']);
  } 
  logout(){
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-email');

    this .router.navigate(['/login']);
  }
}
