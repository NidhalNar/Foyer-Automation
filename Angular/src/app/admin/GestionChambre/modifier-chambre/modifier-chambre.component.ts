import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bloc } from 'src/app/models/Bloc';
import { Chambre, TypeChambre } from 'src/app/models/Chambre';
import { BlocService } from 'src/app/services/BlocService/bloc.service';
import { ChambreService } from 'src/app/services/ChambreService/chambre.service';

@Component({
  selector: 'app-modifier-chambre',
  templateUrl: './modifier-chambre.component.html',
  styleUrls: ['./modifier-chambre.component.css']
})
export class ModifierChambreComponent {
  chambreId!: number;
  chambre!: Chambre;
  typeChambre = TypeChambre;
  blocs!: Bloc[];
  showAlert = false;
  constructor(
    private chambreService: ChambreService,
    private route: ActivatedRoute,
    private router: Router,
    private blocService:BlocService,

  ) { }


  ngOnInit() {
    // Récupérer l'ID de la chambre à partir de l'URL
    this.chambreId = this.route.snapshot.paramMap.has('id') ? +this.route.snapshot.paramMap.get('id') !: 0;

    

    // Charger les détails de la chambre
    this.loadChambreDetails();
    this.loadBlocs();
  }
  loadBlocs() {
    const blocsSubscription = this.blocService.getAllBlocs().subscribe({
      next: (blocs: Bloc[]) => {
        this.blocs = blocs;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la liste des bloc :', error);
      },
      complete: () => {
        blocsSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
      },
    });
  }
  
  loadChambreDetails() {
    const chambreDetailsSubscription = this.chambreService.getChambreById(this.chambreId).subscribe({
      next: (chambre) => {
        this.chambre = chambre;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails de la chambre :', error);
      },
      complete: () => {
        chambreDetailsSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
      },
    });
  }
  

  updateChambre() {
    const updateSubscription = this.chambreService.updateChambre(this.chambre).subscribe({
      next: (updatedChambre) => {
        console.log('Chambre mise à jour avec succès:', updatedChambre);
        // Rediriger vers la page de détails après la mise à jour si nécessaire
        this.showAlert = true;
    
      },
      
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la chambre :', error);
      },
      complete: () => {
        updateSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
      },
    });
  }
  
}
