import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FoyerService } from 'src/app/services/FoyerService/foyer.service';
import { Foyer } from 'src/app/models/Foyer';
import { BlocService } from 'src/app/services/BlocService/bloc.service';
import { MessageService } from 'src/app/services/message.service';



@Component({
  selector: 'app-ajout-bloc',
  templateUrl: './ajout-bloc.component.html',
  styleUrls: ['./ajout-bloc.component.css']
})
export class AjoutBlocComponent implements OnInit {
  addBlocForm !: FormGroup; 
   foyers!:Foyer[]
   showAlert = false;
   private foyersSubscription!: Subscription;
   private messageSubscription!: Subscription;
  


  constructor(private blocService: BlocService ,
    private foyerService :FoyerService,
    private fb: FormBuilder, 
     private messageService: MessageService,
     private router: Router) {}
//appelé lorsqu'Angular a initialisé le composant après avoir créé 
//ses composants enfants et configuré les liaisons de données
     ngOnInit() {
      this.foyersSubscription = this.foyerService.getAllFoyers().subscribe({
        next: (foyers) => {
          this.foyers = foyers;
          this.initializeForm();
        },
        error: (error) => {
          console.error('Error fetching foyers:', error);
        }
      });
  
      this.messageSubscription = this.messageService.message$.subscribe({
        next: (message) => {
          if (message) {
            alert(message);
          }
        },
        error: (error) => {
          console.error('Error in message subscription:', error);
        }
      });
    }
  //réaliser le nettoyage adéquat de son composant.

    ngOnDestroy() {
      this.foyersSubscription.unsubscribe();
      this.messageSubscription.unsubscribe();
    }
  //  Reactive Forms
  //Initialisation du formulaire
initializeForm() {
  this.addBlocForm = this.fb.group({
    nomBloc: ['', [Validators.required, Validators.minLength(3)]],
    capciteBloc: ['', [Validators.required, Validators.pattern(/^\d+$/)]],// Assurez-vous que le type est correctement défini
    foyer: [null, Validators.required],
  });
}

onSubmit() {
  if (this.addBlocForm.valid) {
    const nomBlocValue = this.addBlocForm.get('nomBloc')?.value;
    const capaciteBlocValue = this.addBlocForm.get('capciteBloc')?.value;
    const foyerValue = this.addBlocForm.get('foyer')?.value;

    if (nomBlocValue && capaciteBlocValue && foyerValue) {
      const userConfirmed = window.confirm('Voulez-vous vraiment ajouter ce bloc ?');
      if (userConfirmed) {
        const blocData = {
          nomBloc: nomBlocValue,
          capciteBloc: capaciteBlocValue,
          foyer: { idFoyer: foyerValue.idFoyer }
        };

        this.blocService.addBloc(blocData).subscribe({
          next: (response) => {
            console.log('Bloc ajouté avec succès :', response);
            this.addBlocForm.reset();
          //  this.messageService.setMessage('Bloc ajouté avec succès.');
          this.showAlert = true;
          },
          error: (error) => {
          {
              // Default error message
              this.messageService.setMessage('Le nom du bloc existe déjà. Veuillez choisir un nom unique.');
            }
          },
          complete: () => {
            // Code à exécuter lorsqu'il n'y a plus de données à recevoir
          }
        });
      } else {
        console.error('Certaines valeurs du formulaire sont null ou undefined.');
      }
    }
  }
}


}
