import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chambre } from 'src/app/models/Chambre';
import { EtudiantService } from 'src/app/services/serviceEtudiant/etudiant.service';
@Component({
  selector: 'app-details-reservation-chambre',
  templateUrl: './details-reservation-chambre.component.html',
  styleUrls: ['./details-reservation-chambre.component.css']
})

export class DetailsReservationChambreComponent implements OnInit {
  userId !: number;
  chambres: Chambre[] = [];
  showSuccessAlert: boolean = true;
  constructor(private route: ActivatedRoute, private chambreService: EtudiantService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadChambresForEtudiant(this.userId);
    });
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3000);
  }

  loadChambresForEtudiant(userId: number): void {
    this.chambreService.getChambresForUser(userId).subscribe(
      (data) => {
        this.chambres = data;
        console.log('Chambres data:', data); // Log the data to the console
      },
      (error) => {
        console.error('Error fetching chambres:', error);
      }
    );
  }
}
