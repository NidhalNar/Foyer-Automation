import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllReservationsEtudiantComponent } from 'src/app/admin/GestionEtudiant/all-reservations-etudiant/all-reservations-etudiant.component';
import { DetailsReservationChambreComponent } from 'src/app/admin/GestionEtudiant/details-reservation-chambre/details-reservation-chambre.component';
import { ShowReservationChambreComponent } from 'src/app/user/GestionEtudiant/show-reservation-chambre/show-reservation-chambre.component';

const routes: Routes = [
  { path: 'AllReservationsEtudiant', component: AllReservationsEtudiantComponent },
  { path: 'DetailsReservationChambre/:id', component: DetailsReservationChambreComponent },
  { path: 'ShowReservationChambre/:email', component: ShowReservationChambreComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
