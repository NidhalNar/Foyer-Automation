import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bloc } from 'src/app/models/Bloc';
import { Foyer } from 'src/app/models/Foyer';
import { BlocService } from 'src/app/services/BlocService/bloc.service';
import { FoyerService } from 'src/app/services/FoyerService/foyer.service';


@Component({
  selector: 'app-details-bloc',
  templateUrl: './details-bloc.component.html',
  styleUrls: ['./details-bloc.component.css']
})
export class DetailsBlocComponent implements OnInit {

  blocDetails: Bloc | null = null;




  constructor(private blocService: BlocService,private foyerService :FoyerService, private route : ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idBloc = +params['id']; // + pour convertir le paramètre en nombre
      console.log('bloc ID from URL:', idBloc);
      this.showBlocDetails(idBloc);
    });
   
  }

  
  

  showBlocDetails(idBloc: number) {
    this.blocService.retrieveBloc(idBloc).subscribe(
      (blocDetails) => {
        this.blocDetails = blocDetails;
        console.log('Détails du bloc:', this.blocDetails);
      },
      (error) => {
        console.error(`Erreur lors de la récupération des détails du bloc avec ID ${idBloc}:`, error);
      }
    );
  }
}
