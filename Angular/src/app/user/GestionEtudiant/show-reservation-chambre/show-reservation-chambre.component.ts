import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Chambre } from 'src/app/models/Chambre';
import { Reservation } from 'src/app/models/Reservation';
import { UserDetails } from 'src/app/models/userDetails';
import { EtudiantService } from 'src/app/services/serviceEtudiant/etudiant.service';

@Component({
  selector: 'app-show-reservation-chambre',
  templateUrl: './show-reservation-chambre.component.html',
  styleUrls: ['./show-reservation-chambre.component.css']
})
export class ShowReservationChambreComponent implements OnInit {
  user!: Observable<UserDetails>;
  chambres!: Observable<Chambre[]>;
  reservation!: Observable<Reservation[]>;

  constructor(
    private etudiantService: EtudiantService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userEmail = params['email'];
      this.user = this.etudiantService.loadUserProfileByEmail(userEmail);
      this.user.subscribe((user) => {
        if (user?.id !== undefined) {
          // Assuming user.id is available after loading the user profile
          this.chambres = this.etudiantService.getChambresForUser(user.id);
        } else {
          console.error('User ID is undefined.');
        }
      });
    });
  }
}
