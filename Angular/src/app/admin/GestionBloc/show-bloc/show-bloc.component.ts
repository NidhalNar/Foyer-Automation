import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoyerService } from 'src/app/services/FoyerService/foyer.service';
import { Bloc } from 'src/app/models/Bloc';
import { Foyer } from 'src/app/models/Foyer';
import { BlocService } from 'src/app/services/BlocService/bloc.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-show-bloc',
  templateUrl: './show-bloc.component.html',
  styleUrls: ['./show-bloc.component.css']
})
export class ShowBlocComponent implements OnInit {
  blocs!: Bloc[];
  foyes!:Foyer[];

totalItems!: number;
itemsPerPage: number = 5; 
currentPage: number = 1;
totalPages!: number;
pages!: number[];
blocsToShow: Bloc[] = [];


  
 

  constructor(private blocService: BlocService,private foyerService :FoyerService, private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    const blocsSubscription = this.blocService.getAllBlocs().subscribe({
      next: (response) => {
        this.blocs = response;
        // Une fois que vous avez récupéré les blocs, vous pouvez récupérer les informations sur les foyers
        this.fetchFoyersForBlocs();
        this.fetchPaginatedBlocs();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des blocs :', error);
      },
      complete: () => {
        blocsSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
      },
    });
  /*
    const messageSubscription = this.messageService.message$.subscribe({
      next: (message) => {
        if (message) {
          // Afficher un toast, une alerte ou tout autre élément d'UI en fonction du message
          alert(message);
        }
      },
      error: (error) => {
        console.error('Erreur dans la souscription au message:', error);
      },
      complete: () => {
        messageSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
      },
    });
    */
  }
  

  fetchPaginatedBlocs() {
    // Ajoutez une logique pour récupérer uniquement les éléments de la page actuelle
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  
    // Utilisez la tranche (slice) pour obtenir les éléments de la page actuelle
    this.blocsToShow = this.blocs.slice(startIndex, endIndex);
    
    // Mettez à jour le nombre total d'éléments, le nombre total de pages, et la liste des pages
    this.totalItems = this.blocs.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  

  pageChanged(page: number): void {
  
    this.currentPage = page;
    this.fetchPaginatedBlocs();
   
  }
  
  
  fetchFoyersForBlocs() {
    for (const bloc of this.blocs) {
      if (bloc.foyer) {  // Vérifiez que la propriété foyer est définie
        const foyerSubscription = this.foyerService.retrieveFoyer(bloc.foyer.idFoyer).subscribe({
          next: (foyer) => {
            // Mettez à jour le bloc avec les informations sur le foyer
            bloc.foyer = foyer;
          },
          error: (error) => {
            console.error('Erreur lors de la récupération du foyer :', error);
          },
          complete: () => {
            foyerSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
          },
        });
      }
    }
  }
  

  removeFoyerFromBloc(idBloc: number, idFoyer: number) {
    console.log('Before removing foyer from bloc');
    const removeFoyerSubscription = this.blocService.removeFoyerFromBloc(idBloc, idFoyer).subscribe({
      next: () => {
        console.log('Foyer removed from bloc, now removing bloc');
        this.removeBlocAfterFoyerRemoval(idBloc);
        this.messageService.setMessage('Foyer supprimé avec succès.');
      },
      error: (error) => {
        console.error(`Error removing foyer from bloc with ID ${idBloc}:`, error);
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Response body:', error.error);
          this.messageService.setMessage('Erreur lors de la suppression du foyer.');
        }
      },
      complete: () => {
        removeFoyerSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
      },
    });
  }
  

  removeBlocAfterFoyerRemoval(idBloc: number) {
    const userConfirmed = window.confirm('Voulez-vous vraiment supprimer ce bloc ?');
    if (userConfirmed) {
      console.log('Removing bloc with ID:', idBloc);
      // Supprimer le bloc
      const removeBlocSubscription = this.blocService.removeBloc(idBloc).subscribe({
        next: (response) => {
          if (response.message) {
            console.log(response.message); // Log success message
            this.refreshBloc();
            // Rafraîchir automatiquement la page après la suppression
            location.reload();
          } else {
            console.error('Error removing bloc:', response.error);
          }
        },
        error: (error) => {
          // Handle other errors if necessary
          console.error('Error removing bloc:', error);
        },
        complete: () => {
          removeBlocSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
        },
      });
    }
  }
  

  refreshBloc() {
    const refreshBlocSubscription = this.blocService.getAllBlocs().subscribe({
      next: (blocs) => {
        // Mettez à jour la liste des blocs avec les dernières données
        this.blocs = blocs;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des blocs après la suppression :', error);
      },
      complete: () => {
        refreshBlocSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
      },
    });
  }
  

showBlocDetails(idBloc: number) {
  this.router.navigate(['bloc','bloc-details', idBloc]);
}


editBloc(idBloc: number) {
  this.router.navigate(['bloc','modifier-bloc', idBloc]);
}



}
