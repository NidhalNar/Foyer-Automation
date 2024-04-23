import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddChambresComponent } from 'src/app/admin/GestionChambre/add-chambres/add-chambres.component';
import { ShowchambreComponent } from 'src/app/admin/GestionChambre/showchambre/showchambre.component';
import { DeletechambresComponent } from 'src/app/admin/GestionChambre/deletechambres/deletechambres.component';
import { ChambreDetailsComponent } from 'src/app/admin/GestionChambre/chambre-details/chambre-details.component';
import { DashbordChambreComponent } from 'src/app/admin/GestionChambre/dashbord-chambre/dashbord-chambre.component';
import { ModifierChambreComponent } from 'src/app/admin/GestionChambre/modifier-chambre/modifier-chambre.component';
import { ShowChambreUserComponent } from 'src/app/user/UserChambre/show-chambre-user/show-chambre-user.component';
import { DetailsChambreUserComponent } from 'src/app/user/UserChambre/details-chambre-user/details-chambre-user.component';
import { StatistiqueChambreComponent } from 'src/app/admin/GestionChambre/statistique-chambre/statistique-chambre.component';
import { EvaluationFormComponent } from 'src/app/user/UserChambre/evaluation-form/evaluation-form.component';
import { EvaluationChartComponent } from 'src/app/admin/GestionChambre/evaluation-chart/evaluation-chart.component';
import { ShowChambreDetailsresdateComponent } from 'src/app/admin/GestionChambre/show-chambre-detailsresdate/show-chambre-detailsresdate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailschambreadminComponent } from 'src/app/admin/GestionChambre/detailschambreadmin/detailschambreadmin.component';
import { DashboardComponent } from 'src/app/admin/GestionReservation/dashboard/dashboard.component';
import { CombinedChartsComponent } from 'src/app/admin/combined-charts/combined-charts.component';


const routes: Routes = [
  { path: 'chart', component: CombinedChartsComponent },
  { path: 'add-chambre', component: AddChambresComponent },
  { path: 'display-chambres', component: ShowchambreComponent },
  { path: 'delete-chambre', component: DeletechambresComponent },
  { path: 'chambre-details/:id', component: ChambreDetailsComponent },
  { path: 'modifier-chambre/:id', component: ModifierChambreComponent },
  { path: 'statistique-chambre', component: StatistiqueChambreComponent },
  { path: 'User-chambre-details/:id', component: DetailsChambreUserComponent },
  { path:'ShowChambreUser',component:ShowChambreUserComponent},
  { path: 'evaluation-form/:id', component: EvaluationFormComponent },
  { path: 'evaluation-Chart', component: EvaluationChartComponent },
  { path: 'chambreadmin-details/:id', component: DetailschambreadminComponent },
  { path: 'Dashboard', component: DashboardComponent },


  {
    path: 'showchambredetailsforcurrentchambre-chambre/:id',
    component: ShowChambreDetailsresdateComponent,
  },
 
];

@NgModule({
  declarations: [
    AddChambresComponent,
    DeletechambresComponent,
    ShowchambreComponent,
    DashbordChambreComponent,
    ChambreDetailsComponent,
    ModifierChambreComponent,
    ShowChambreUserComponent,
    DetailsChambreUserComponent,
    StatistiqueChambreComponent,
    EvaluationFormComponent,
    EvaluationChartComponent,
    ShowChambreDetailsresdateComponent,DashboardComponent,CombinedChartsComponent

   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
   
  ]
})
export class GestionChambreModule { }
