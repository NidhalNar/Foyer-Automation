import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Bloc } from 'src/app/models/Bloc';
import { Chambre } from 'src/app/models/Chambre';
import { BlocService } from 'src/app/services/BlocService/bloc.service';
import { ChambreService } from 'src/app/services/ChambreService/chambre.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-showchambre',
  templateUrl: './showchambre.component.html',
  styleUrls: ['./showchambre.component.css']
})
export class ShowchambreComponent implements OnInit {
  chambres!: Chambre[];
  blocs!: Bloc[];
  selectedChambre: Chambre | null = null;
  dateForm!: FormGroup;
  // Ajoutez ces propriétés à votre classe ShowBlocComponent
totalItems!: number;
itemsPerPage: number = 4; // Ajustez selon vos besoins
currentPage: number = 1;
totalPages!: number;
pages!: number[];
chambresToShow: Chambre[] = [];


  constructor(private chambreService: ChambreService,
     private blocService: BlocService,
     private router: Router,
     private route: ActivatedRoute,
     private messageService: MessageService) {}

  ngOnInit() {
    this.loadChambres();
    const idChambre = this.route.snapshot.params['id'];
    console.log('Chambre ID from URL:', idChambre);
   // this.loadBlocs();
  
  }

  

  loadChambres() {
    forkJoin({
      chambres: this.chambreService.getAllChambres(),
      blocs: this.blocService.getAllBlocs()
    }).subscribe({
      next: (data: { chambres: Chambre[], blocs: Bloc[] }) => {
        console.log('Chambres:', data.chambres);
        console.log('Blocs:', data.blocs);
        this.chambres = data.chambres;
        this.blocs = data.blocs;
        this.fetchPaginatedChambre();
      },
      error: error => {
        console.error('Error loading data:', error);
      }
    });
  }
  deleteChambre(idChambre: number) {
    const userConfirmed = window.confirm('Voulez-vous vraiment supprimer cette chambre ?');
    if (userConfirmed) {
        const deleteSubscription = this.chambreService.deleteChambre(idChambre).subscribe({
            next: () => {
                console.log(`Chambre avec ID ${idChambre} supprimée avec succès.`);
                alert(`Chambre avec ID ${idChambre} supprimée avec succès.`);
                this.refreshChambres();
                this.fetchPaginatedChambre();
            },
            error: (error) => {
                this.messageService.setMessage('Erreur lors de la suppression de la chambre.');
                if (error.status === 200) {
                    // Si le statut est 200, considérez-le comme une suppression réussie
                    console.log(`Chambre avec ID ${idChambre} supprimée avec succès .`);
                    alert(`Chambre avec ID ${idChambre} supprimée avec succès .`);
                    this.refreshChambres();
                    this.fetchPaginatedChambre();
                } else if (error.status === 400) {
                    // Si le statut est 400, considérez-le comme une erreur spécifique (réservations en cours)
                    this.messageService.setMessage('La chambre a des réservations en cours. Suppression impossible.');
                    alert(`La chambre a des réservations en cours. Suppression impossible. ${idChambre}`);
                } else {
                    // Gérez d'autres erreurs ici si nécessaire
                    console.error(`Erreur lors de la suppression de la chambre avec ID ${idChambre}:`, error);
                    this.messageService.setMessage(`Erreur lors de la suppression de la chambre avec ID ${idChambre}: ${error.message}`);
                }
            },
            complete: () => {
                deleteSubscription.unsubscribe();
            },
        });
    }
}




  refreshChambres() {
    const refreshSubscription = this.chambreService.getAllChambres().subscribe({
      next: (chambres) => {
        // Mettez à jour la liste des chambres avec les dernières données
        this.chambres = chambres;
        this.fetchPaginatedChambre();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des chambres après la suppression :', error);
      },
      complete: () => {
        refreshSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
      },
    });
  }
  

  showDetails(idChambre: number) {
    this.router.navigate(['dashboard', 'chambreadmin-details', idChambre]);
  }
  editChambre(chambreId: number) {
    // Redirigez vers la page de modification avec l'ID de la chambre
    this.router.navigate(['dashboard','modifier-chambre', chambreId]);
  }
  generateAndDownloadPDF(idBloc: number): void {
    const pdfSubscription = this.chambreService.getPDF(idBloc).subscribe({
      next: (pdfBlob: Blob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = 'liste_chambres.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error: (error) => {
        console.error('Error generating PDF:', error);
      },
      complete: () => {
        pdfSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
      },
    });
  }
  
  getChambreDetailsForCurrentChambre(chambreId:number){
    this.router.navigate(['dashboard','showchambredetailsforcurrentchambre-chambre', chambreId]);
  }

  fetchPaginatedChambre() {
    // Ajoutez une logique pour récupérer uniquement les éléments de la page actuelle
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  
    // Utilisez la tranche (slice) pour obtenir les éléments de la page actuelle
    this.chambresToShow = this.chambres.slice(startIndex, endIndex);
    
    // Mettez à jour le nombre total d'éléments, le nombre total de pages, et la liste des pages
    this.totalItems = this.blocs.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  

  pageChanged(page: number): void {
  
    this.currentPage = page;
    this.fetchPaginatedChambre();
   
  }
  

}
