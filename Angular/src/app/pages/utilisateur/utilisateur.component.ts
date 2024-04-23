import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent 
  implements OnInit {

    constructor(
      private router: Router
    ) { }
  
    ngOnInit(): void {
    }
  
    cancel(): void {
      this.router.navigate(['profil']);
    }
  }


