import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../user/footer/footer.component';
import { HeaderComponent } from '../user/header/header.component';
import { NavbarComponent } from '../user/navbar/navbar.component';
import { FooterBackComponent } from '../admin/footer-back/footer-back.component';
import { AdminDashComponent } from '../admin/Admin-Dashboard/admin-dash/admin-dash.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [FooterComponent, HeaderComponent, NavbarComponent,FooterBackComponent,AdminDashComponent],
  exports: [FooterComponent, HeaderComponent, NavbarComponent,FooterBackComponent,AdminDashComponent],
  imports: [CommonModule],
})
export class SharedModule { }
