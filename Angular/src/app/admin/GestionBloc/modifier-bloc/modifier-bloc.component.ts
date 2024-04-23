import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bloc } from 'src/app/models/Bloc';
import { Foyer } from 'src/app/models/Foyer';
import { BlocService } from 'src/app/services/BlocService/bloc.service';
import { FoyerService } from 'src/app/services/FoyerService/foyer.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-modifier-bloc',
  templateUrl: './modifier-bloc.component.html',
  styleUrls: ['./modifier-bloc.component.css']
})
export class ModifierBlocComponent implements OnInit, OnDestroy {
  blocId!: number;
  bloc!: Bloc;
  foyers: Foyer[] = [];
  showAlert = false;

  foyerSubscription: Subscription | undefined;

  constructor(
    private blocService: BlocService,
    private route: ActivatedRoute,
    private router: Router,
    private foyerService: FoyerService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // Récupérer l'ID du bloc à partir de la route
    this.blocId = this.route.snapshot.paramMap.has('id') ? +this.route.snapshot.paramMap.get('id') !: 0;

    // Charger les détails du bloc et foyer
    this.loadBlocDetails();
    this.loadFoyers();

    this.messageService.message$.subscribe({
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
        console.log('Souscription au message terminée.');
      }
    });
  }

  ngOnDestroy() {
    if (this.foyerSubscription) {
      this.foyerSubscription.unsubscribe();
    }
  }

  loadFoyers() {
    this.foyerSubscription = this.foyerService.getAllFoyers().subscribe({
      next: (foyers: Foyer[]) => {
        this.foyers = foyers;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la liste des foyers :', error);
      },
      complete: () => {
        console.log('Chargement des foyers terminé.');
      }
    });
  }

  loadBlocDetails() {
    this.blocService.getBlocById(this.blocId).subscribe({
      next: (bloc: any) => {
        this.bloc = bloc;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails du bloc :', error);
      }
    });
  }

  updateBloc() {
    this.blocService.updateBloc(this.bloc).subscribe({
      next: (updatedBloc) => {
        console.log('Bloc mis à jour avec succès:', updatedBloc);
        // this.messageService.setMessage('Bloc mis à jour avec succès.');
        this.showAlert = true;
        
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du bloc :', error);
        this.messageService.setMessage('Erreur lors de la mise à jour du bloc.');
      }
    });
  }
}
