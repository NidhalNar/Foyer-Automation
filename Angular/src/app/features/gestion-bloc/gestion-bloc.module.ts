import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashbordBlocComponent } from 'src/app/admin/GestionBloc/dashbord-bloc/dashbord-bloc.component';
import { AjoutBlocComponent } from 'src/app/admin/GestionBloc/ajout-bloc/ajout-bloc.component';
import { DeleteBlocComponent } from 'src/app/admin/GestionBloc/delete-bloc/delete-bloc.component';
import { DetailsBlocComponent } from 'src/app/admin/GestionBloc/details-bloc/details-bloc.component';
import { ShowBlocComponent } from 'src/app/admin/GestionBloc/show-bloc/show-bloc.component';
import { ModifierBlocComponent } from 'src/app/admin/GestionBloc/modifier-bloc/modifier-bloc.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: 'dashboard-bloc', component: DashbordBlocComponent },
  { path: 'add-bloc', component: AjoutBlocComponent },
  { path: 'delete-bloc', component: DeleteBlocComponent },
  { path: 'bloc-details/:id', component: DetailsBlocComponent },
  { path: 'show-bloc', component: ShowBlocComponent },
  { path: 'modifier-bloc/:id', component: ModifierBlocComponent },
];

@NgModule({
  declarations: [ 
    AjoutBlocComponent,
    DeleteBlocComponent,
    DashbordBlocComponent,
    DetailsBlocComponent,
    ShowBlocComponent,
    ModifierBlocComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class GestionBlocModule { }
