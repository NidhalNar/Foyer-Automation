import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../authentication.service";

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('user-token');

    if (token) {
      //this.router.navigate(['/login']);
      return true;
    }

    return false;
  }
}
