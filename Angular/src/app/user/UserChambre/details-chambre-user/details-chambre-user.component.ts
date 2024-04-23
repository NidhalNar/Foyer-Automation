import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chambre } from 'src/app/models/Chambre';
import { ChambreService } from 'src/app/services/ChambreService/chambre.service';

@Component({
  selector: 'app-details-chambre-user',
  templateUrl: './details-chambre-user.component.html',
  styleUrls: ['./details-chambre-user.component.css']
})
export class DetailsChambreUserComponent implements OnInit {
  selectedChambre: Chambre | null = null;

  constructor(private chambreService :ChambreService,private route : ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idChambre = +params['id']; // + pour convertir le paramètre en nombre
      console.log('Chambre ID from URL:', idChambre);
      this.showDetails(idChambre);
    });
   
  }

  showDetails(idChambre: number) {
    console.log('Show Details for Chambre ID:', idChambre);
    this.chambreService.getChambreById(idChambre).subscribe(
      (chambre: Chambre) => {
        console.log('Chambre Details:', chambre);
        this.selectedChambre = chambre;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la chambre :', error);
      }
    );
  }

}