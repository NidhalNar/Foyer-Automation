import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { AllReservationsEtudiantComponent } from 'src/app/admin/GestionEtudiant/all-reservations-etudiant/all-reservations-etudiant.component';
import { DetailsReservationChambreComponent } from 'src/app/admin/GestionEtudiant/details-reservation-chambre/details-reservation-chambre.component';
import { ShowReservationChambreComponent } from 'src/app/user/GestionEtudiant/show-reservation-chambre/show-reservation-chambre.component';
import { AdminDashComponent } from 'src/app/admin/Admin-Dashboard/admin-dash/admin-dash.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AllReservationsEtudiantComponent,
    DetailsReservationChambreComponent,
    ShowReservationChambreComponent,
   

  ],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    SharedModule

  ]
})
export class EtudiantModule { }
