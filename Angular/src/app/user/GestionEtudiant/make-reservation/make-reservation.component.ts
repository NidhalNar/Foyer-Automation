import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Reservation } from 'src/app/models/Reservation';
import { Genre, UserDetails } from 'src/app/models/userDetails';
import { EtudiantService } from 'src/app/services/serviceEtudiant/etudiant.service';
import { ReservationService } from 'src/app/services/serviceReservation/reservation.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css'],
})
export class MakeReservationComponent implements OnInit {
  reservationForm!: FormGroup;

  idChambre!: number;
  isDoubleOrTriple: boolean = false;
  usersList!: Observable<UserDetails[]>;
  typeChambre: string = '';
  gender: Genre = Genre.HOMME; // Set a default value based on your requirements
  currentUserEmail: string | null = '';

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private userService: EtudiantService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idChambre = +params['idChambre'];
      console.log('ID de chambre dans ngOnInit:', this.idChambre);
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.typeChambre = queryParams['typeChambre'];
      console.log('Type de chambre dans ngOnInit:', this.typeChambre);
    });

    // Get the current user's email from AuthService
    this.currentUserEmail = this.authService.getCurrentUserEmail();

    this.reservationForm = this.fb.group({
      id: [''],
      anneeUniversitaire: [this.getCurrentYear(), [Validators.required]],
      estValide: 'false',
      roommates: [[]],
    });

    if (this.typeChambre === 'DOUBLE' || this.typeChambre === 'TRIPLE') {
      this.reservationForm.get('id')?.enable();
      this.reservationForm.get('estValide')?.enable();
      this.reservationForm.get('anneeUniversitaire')?.enable();
      this.reservationForm.get('roommates')?.enable();
    }

    this.userService.getUsers().subscribe(
      (allUsers) => {
        const filteredUsers = allUsers.filter(
          (user) => !user.reservation || user.reservation.length === 0
        );
        this.usersList = of(filteredUsers);
      },
      (error) => {
        console.error('Failed to fetch users:', error);
      }
    );
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  onSubmit(): void {
    console.log('ID de chambre dans onSubmit:', this.idChambre);
    if (this.reservationForm.valid && this.currentUserEmail) {
      console.log('Form Valid:', this.reservationForm.valid);
      const reservation: Reservation = {
        idReservation: this.reservationForm.value.id,
        anneeUniversitaire: this.reservationForm.value.anneeUniversitaire,
        estValide: this.reservationForm.value.estValide,
        roommates: this.reservationForm.value.roommates,
      };

      this.reservationService
        .makeUserReservationChambre(this.idChambre, this.currentUserEmail, reservation)
        .subscribe(
          (response) => {
            console.log('Reservation created successfully:', response);
            console.log('the id ', this.idChambre);
          },
          (error) => {
            console.error('Failed to create reservation:', error);
            if (error.status === 400) {
              // Gérer les erreurs spécifiques ici
              if (error.error === 'L\'utilisateur a déjà une réservation.') {
                alert('L\'utilisateur a déjà une réservation.');
              } else if (error.error === 'La chambre est déjà réservée.') {
                alert('La chambre est déjà réservée.');
              } else {
                alert('Erreur inattendue lors de la création de la réservation.');
              }
            }
          }
        );
    }
  }
}
