import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllReservationsComponent } from 'src/app/admin/GestionReservation/all-reservations/all-reservations.component';
import { DashboardComponent } from 'src/app/admin/GestionReservation/dashboard/dashboard.component';
import { MakeReservationComponent } from 'src/app/user/GestionEtudiant/make-reservation/make-reservation.component';

const routes: Routes = [
  { path: 'AllReservations', component: AllReservationsComponent },
  { path: 'make-user-reservation-chambre/:idChambre/:id', component: MakeReservationComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
