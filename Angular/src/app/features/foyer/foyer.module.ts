import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FoyerComponent } from 'src/app/admin/GestionFoyer/foyer/foyer.component';
import { FoyerRoutingModule } from './foyer-routing.module';
import { UniversityComponent } from 'src/app/admin/GestionFoyer/university/university.component';
import { StatistiqueComponent } from 'src/app/admin/GestionFoyer/statistique/statistique.component';



@NgModule({
  declarations: [
    FoyerComponent,
    UniversityComponent,
    StatistiqueComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FoyerRoutingModule,
    SharedModule,
    FormsModule

  ]
})
export class FoyerModule { }