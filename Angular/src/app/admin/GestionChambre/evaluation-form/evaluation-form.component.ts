import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evaluation } from 'src/app/models/Evaluation';
import { ChambreService } from 'src/app/services/ChambreService/chambre.service';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit {

  chambreId!: number;
  evaluation: Evaluation = { note: 0 }; // Initialize with default values

  constructor(private route: ActivatedRoute, private chambreService: ChambreService,private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.chambreId = +params['id']; // Convert the parameter to a number
    });
  }

  onSubmit(): void {
    if (this.evaluation.note >= 0 && this.evaluation.note <= 100) {
    // Submit the evaluation to the backend
    this.chambreService.ajouterEvaluation(this.chambreId, this.evaluation).subscribe(
      (response) => {
        console.log('Evaluation submitted successfully:', response);
        alert('Merci pour votre évaluation!');
        this.router.navigate(['/ShowUserChambre']);
        // Optionally, you can navigate back to the chambre list or perform other actions
      },
      (error) => {
        console.error('Error submitting evaluation:', error);
      }
    );
  }
  else {
    // Display an alert or handle the case where the note is out of range
    alert('La note doit être comprise entre 0 et 100.');
  }
}
}
