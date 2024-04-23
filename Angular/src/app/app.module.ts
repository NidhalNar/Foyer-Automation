import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FrontUserComponent } from './user/front-user/front-user.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { DetailschambreadminComponent } from './admin/GestionChambre/detailschambreadmin/detailschambreadmin.component';
import { RegisterComponent } from './register/register/register.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { UtilisateurComponent } from './pages/utilisateur/utilisateur.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login/login.component';
import { WelcomFoyerComponent } from './welcom-foyer/welcom-foyer.component';
import { CardComponent } from './welcom-foyer/card/card.component';



@NgModule({
  declarations: [
    AppComponent,
    FrontUserComponent,
    AdminPageComponent,
    DetailschambreadminComponent,
    RegisterComponent,
    WelcomeComponent,
    ProfilComponent,
    UtilisateurComponent,
    LoginComponent,
    WelcomFoyerComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule, MatListModule, SharedModule,


  ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
