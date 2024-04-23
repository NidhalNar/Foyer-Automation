import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChambreService } from 'src/app/services/ChambreService/chambre.service';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder and FormGroup


@Component({
  selector: 'app-show-chambre-detailsresdate',
  templateUrl: './show-chambre-detailsresdate.component.html',
  styleUrls: ['./show-chambre-detailsresdate.component.css']
})
export class ShowChambreDetailsresdateComponent implements OnInit {
  chambreId!: number;
  chambreDetails: any;  
  dateForm: FormGroup; 


  constructor(private route: ActivatedRoute, private chambreService: ChambreService,private fb: FormBuilder) { 
    this.dateForm = this.fb.group({
      dateDebut: [''], 
      dateFin: ['']
    }); }

    ngOnInit() {
      // Retrieve the chambreId from the route parameters
      this.route.params.subscribe(params => {
        this.chambreId = +params['id'];
        // Fetch chambre details based on chambreId and date range
        this.fetchChambreDetails();
      });
    }
    fetchChambreDetails() {
      const { dateDebut, dateFin } = this.dateForm.value;
    
      // Check if both dateDebut and dateFin have values
      if (!dateDebut || !dateFin) {
        console.error('Please provide both start and end dates.');
        return;
      }
    
      // Validate dates
      if (dateDebut > dateFin) {
        console.error('Invalid date range. End date should be equal to or after the start date.');
        alert('Invalid date range. End date should be equal to or after the start date')
        return;
      }
    
      // Continue with the HTTP request
      this.chambreService.getChambreDetails(this.chambreId, dateDebut, dateFin)
        .subscribe(
          (chambreDetails: any[]) => {
            if (chambreDetails.length > 0) {
              // Chambre(s) found
              this.chambreDetails = chambreDetails;
              alert('votre chambre avec date succes.');

            } else {
              // No chambre found
              console.log('No chambre found for the specified date range.');
              alert('No chambre found for the specified date range.');
              // Optionally, you can display a message or perform other actions
            }
          },
          (error) => {
            console.error('Error fetching chambre details:', error);
          }
        );
    }
    
    
    
    
}
