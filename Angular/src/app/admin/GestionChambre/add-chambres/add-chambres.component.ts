import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Bloc } from 'src/app/models/Bloc';

import { TypeChambre } from 'src/app/models/Chambre';
import { BlocService } from 'src/app/services/BlocService/bloc.service';
import { ChambreService } from 'src/app/services/ChambreService/chambre.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-chambres',
  templateUrl: './add-chambres.component.html',
  styleUrls: ['./add-chambres.component.css']
})
export class AddChambresComponent implements OnInit {
  addChambreForm!: FormGroup;
  TypeChambre = TypeChambre;
  blocs!: Bloc[];
  private blocsSubscription!: Subscription;
   private messageSubscription!: Subscription;
   showAlert = false;


  constructor(private fb: FormBuilder, 
    private chambreService: ChambreService,
    private blocService : BlocService
    ,private messageService: MessageService,
    private router: Router) {}

 // Dans AddChambresComponent
 ngOnInit() {
  const blocsSubscription = this.blocService.getAllBlocs().subscribe({
    next: (blocs) => {
      this.blocs = blocs;
      // Initialize the form after fetching the blocs
      this.initializeForm();
    },
    error: (error) => {
      console.error('Error fetching blocs:', error);
    },
    complete: () => {
      blocsSubscription.unsubscribe(); // Se désabonner pour éviter les fuites de mémoire
    },
  });

}
ngOnDestroy() {
  if (this.blocsSubscription) {
    this.blocsSubscription.unsubscribe();
  }

  if (this.messageSubscription) {
    this.messageSubscription.unsubscribe();
  }
}



initializeForm() {
  this.addChambreForm = this.fb.group({
    numerochambre: ['', Validators.required],
    typechambre: [TypeChambre.SIMPLE, Validators.required],
    bloc: [null, Validators.required],
  });
}

onSubmit() {
  if (this.addChambreForm.valid) {
    const userConfirmed = window.confirm('Voulez-vous vraiment ajouter cette chambre ?');
    if (userConfirmed) {
      const chambreData = {
        numerochambre: this.addChambreForm.get('numerochambre')!.value,
        typechambre: this.addChambreForm.get('typechambre')!.value,
        bloc: { idBloc: this.addChambreForm.get('bloc')!.value.idBloc },
      };

      this.chambreService.addChambre(chambreData).subscribe({
        next: (response) => {
          console.log('Chambre ajoutée avec succès :', response);
          this.addChambreForm.reset();
          this.showAlert = true;
        },
        error: (error) => {
          // Utilisez catchError pour extraire le corps de la réponse même en cas d'erreur
          if (error instanceof HttpErrorResponse && error.status === 201) {
            console.log('Chambre ajoutée avec succès :', error.error);
            this.addChambreForm.reset();
            this.showAlert = true;
          } else {
            console.error('Erreur lors de l\'ajout de la chambre :', error);
            this.messageService.setMessage('Le numéro de chambre doit être unique. Veuillez choisir un autre numéro.');
          }
        },
        complete: () => {
          // Le code à exécuter une fois la requête terminée
        },
      });
      
    }
  }
}


}