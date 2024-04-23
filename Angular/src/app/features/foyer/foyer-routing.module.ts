import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoyerComponent } from 'src/app/admin/GestionFoyer/foyer/foyer.component';
import { StatistiqueComponent } from 'src/app/admin/GestionFoyer/statistique/statistique.component';
import { UniversityComponent } from 'src/app/admin/GestionFoyer/university/university.component';

const routes: Routes = [
  { path: 'all', component: FoyerComponent },
  { path: 'university', component: UniversityComponent },
  { path: 'statistique', component: StatistiqueComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoyerRoutingModule { }