import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chambre } from 'src/app/models/Chambre';
import { Evaluation } from 'src/app/models/Evaluation';
import { ChambreService } from 'src/app/services/ChambreService/chambre.service';

@Component({
  selector: 'app-detailschambreadmin',
  templateUrl: './detailschambreadmin.component.html',
  styleUrls: ['./detailschambreadmin.component.css']
})
export class DetailschambreadminComponent implements OnInit {
  selectedChambre: Chambre| null = null;
  selectedEvaluation: Evaluation | null = null;

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
  
    const detailsSubscription = this.chambreService.getChambreById(idChambre).subscribe({
      next: (chambre: Chambre) => {
        console.log('Chambre Details:', chambre);
        this.selectedChambre = chambre;
              // Appel du service pour récupérer les détails de l'évaluation
      const evaluationSubscription = this.chambreService.getEvaluationByChambreId(idChambre).subscribe({
        next: (evaluation: Evaluation) => {
          console.log('Evaluation Details:', evaluation);
          this.selectedEvaluation = evaluation;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des détails de l\'évaluation :', error);
        },
        complete: () => {
          evaluationSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
        },
      });
    },
      
      
      error: (error) => {
        console.error('Erreur lors de la récupération des détails de la chambre :', error);
      },
      complete: () => {
        detailsSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
      },
    });
  }
  
  
}



