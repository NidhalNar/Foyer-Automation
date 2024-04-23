import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontUserComponent } from './user/front-user/front-user.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { RegisterComponent } from './register/register/register.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { authGuard } from "./services/auth/auth.guard";
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { LoginComponent } from './login/login/login.component';
import { WelcomFoyerComponent } from './welcom-foyer/welcom-foyer.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: 'welcome-foyer', component: WelcomFoyerComponent
  },
  {
    path: 'profil', component: ProfilComponent
  },
  {
    path: 'profil',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
   
  }, {
    path: 'etudiant',
    loadChildren: () =>
      import('./features/etudiant/etudiant.module').then((m) => m.EtudiantModule),
  },
  {
    path: 'reservation',
    loadChildren: () =>
      import('./features/reservation/reservation.module').then((m) => m.ReservationModule),
  },
  {
    path: 'foyer',
    loadChildren: () =>
      import('./features/foyer/foyer.module').then((m) => m.FoyerModule),
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/gestion-chambre/gestion-chambre.module').then(m => m.GestionChambreModule),
  },

  { path: 'bloc', loadChildren: () => import('./features/gestion-bloc/gestion-bloc.module').then(m => m.GestionBlocModule) },

  { path: 'front', component: FrontUserComponent },
  { path: 'adminPage', component: AdminPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
