import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { forkJoin } from 'rxjs';
import { Bloc } from 'src/app/models/Bloc';
import { Chambre } from 'src/app/models/Chambre';
import { Evaluation } from 'src/app/models/Evaluation';
import { BlocService } from 'src/app/services/BlocService/bloc.service';
import { ChambreService } from 'src/app/services/ChambreService/chambre.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-show-chambre-user',
  templateUrl: './show-chambre-user.component.html',
  styleUrls: ['./show-chambre-user.component.css']
})
export class ShowChambreUserComponent implements OnInit {

  chambres!: Chambre[];
  blocs!: Bloc[];
  selectedChambre: Chambre | null = null;
  noteFilter: number | null = null;
  filteredChambres: Chambre[] = [];
  noteEvaluation: number | null = null; // Initialisez noteEvaluation à null
  currentUserEmail: string | null = ''; // Add the variable to store the current user's email




  constructor(private chambreService: ChambreService,    private authService: AuthenticationService 
,  private blocService: BlocService,private activatedRoute: ActivatedRoute,  private router: Router,  // Add Router to the dependencies
  ) {}

  ngOnInit() {
    this.currentUserEmail = this.authService.getCurrentUserEmail();

    console.log('DashbordChambreComponent initialized');
    
    const idChambre = this.activatedRoute.snapshot.params['id'];
    console.log('ActivatedRoute Snapshot:', this.activatedRoute.snapshot.params);

    console.log('Chambre ID from URL:', idChambre);
    this.loadChambres();
    
   // this.loadBlocs();
  }
  applyFilter() {
    if (this.noteFilter !== null) {
      // Filtrer les chambres par note
      this.filteredChambres = this.chambres.filter(chambre =>
        chambre.evaluations && chambre.evaluations.some(evaluation => evaluation.note === this.noteFilter)
      );

      // Vérifier si des chambres ont été trouvées
      if (this.filteredChambres.length === 0) {
        alert("Aucune chambre avec cette note n'a été trouvée.");
      }
    } else {
      // Si aucune note n'est spécifiée, afficher toutes les chambres
      this.filteredChambres = this.chambres;
    }
  }
  /*

  loadChambres() {
    forkJoin({
      chambres: this.chambreService.getAllChambres(),
      blocs: this.blocService.getAllBlocs()
    }).subscribe({
      next: (data: { chambres: Chambre[], blocs: Bloc[] }) => {
        console.log('Chambres:', data.chambres);
        console.log('Blocs:', data.blocs);
         // Assuming your Chambre object has an evaluations property
       
        this.chambres = data.chambres;
        this.blocs = data.blocs;
      },
      error: error => {
        console.error('Error loading data:', error);
      }
    });
  }
  */
  loadChambres() {
    forkJoin({
      chambres: this.chambreService.getAllChambres(),
      blocs: this.blocService.getAllBlocs()
    }).subscribe({
      next: (data: { chambres: Chambre[], blocs: Bloc[] }) => {
        console.log('Chambres:', data.chambres);
        console.log('Blocs:', data.blocs);
        
        this.chambres = data.chambres;
  
        // Calculer la note moyenne des évaluations pour chaque chambre
        this.chambres.forEach(chambre => {
          if (chambre.evaluations && chambre.evaluations.length > 0) {
            const sum = chambre.evaluations.reduce((acc, evaluation) => acc + evaluation.note, 0);
            chambre.noteEvaluation = sum / chambre.evaluations.length;
          } else {
            chambre.noteEvaluation = 0; // Si aucune évaluation, la note moyenne est 0
          }
        });
  
        this.blocs = data.blocs;
      },
      error: error => {
        console.error('Error loading data:', error);
      }
    });
  }
  
 
  refreshChambres() {
    this.chambreService.getAllChambres().subscribe(
      (chambres) => {
        // Mettez à jour la liste des chambres avec les dernières données
        this.chambres = chambres;
      },
      (error) => {
        console.error('Erreur lors de la récupération des chambres après la suppression :', error);
      }
    );
  }

  // Inside ShowChambreUserComponent


// show-chambre-user.component.ts

showDetails(idChambre: number) {
  console.log('Navigating to details for Chambre ID:', idChambre);
  this.router.navigate(['dashboard', 'User-chambre-details', idChambre]);
}

  
  
  
  openEvaluationForm(chambreId: number) {
    // You can navigate to a new component or open a modal for evaluation
    this.router.navigate(['dashboard', 'evaluation-form', chambreId]);
  }

  redirectToReservation(idChambre: number, typeChambre: string) {
    console.log('ID de chambre dans redirectToReservation:', idChambre);

    if (idChambre !== undefined) {
      this.router.navigate(['reservation', 'make-user-reservation-chambre', idChambre, 5], {
        queryParams: { typeChambre: typeChambre, gender: 'FEMME', user: this.currentUserEmail }
      });
    } else {
      console.error('ID de chambre est undefined. Vérifiez la valeur dans ShowChambreComponent.');
    }
  }
}
  


