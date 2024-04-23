import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllReservationsComponent } from 'src/app/admin/GestionReservation/all-reservations/all-reservations.component';
import { ReservationRoutingModule } from './reservation-routing.module';
import { MakeReservationComponent } from 'src/app/user/GestionEtudiant/make-reservation/make-reservation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AllReservationsComponent,
    
    MakeReservationComponent,
  ],

  imports: [
    CommonModule,
    ReservationRoutingModule, 
    ReactiveFormsModule,
    SharedModule

  ]
})
export class ReservationModule { }
