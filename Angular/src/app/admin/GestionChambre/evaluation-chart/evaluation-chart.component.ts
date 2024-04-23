import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChambreService } from 'src/app/services/ChambreService/chambre.service';
import { Evaluation } from 'src/app/models/Evaluation';

Chart.register(...registerables);

@Component({
  selector: 'app-evaluation-chart',
  templateUrl: './evaluation-chart.component.html',
  styleUrls: ['./evaluation-chart.component.css']
})
export class EvaluationChartComponent implements OnInit {
  wellRatedEvaluations!: Evaluation[];
  notWellRatedEvaluations!: Evaluation[];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: Chart | undefined;


  constructor(private chambreService: ChambreService) {}

  ngOnInit() {
    this.loadEvaluations();
  }

  loadEvaluations(): void {
    // Récupérer les évaluations bien notées
    this.chambreService.getWellRatedEvaluations().subscribe(
      (wellRatedEvaluations) => {
        this.wellRatedEvaluations = wellRatedEvaluations;
        console.log('Bien notées:', this.wellRatedEvaluations);
       

        // Récupérer les évaluations mal notées
        this.chambreService.getNotWellRatedEvaluations().subscribe(
          (notWellRatedEvaluations) => {
            this.notWellRatedEvaluations = notWellRatedEvaluations;
            console.log('mal notées:', this.notWellRatedEvaluations);
            this.initializeChart();
          },
          (error) => {
            console.error('Erreur lors de la récupération des évaluations mal notées', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des évaluations bien notées', error);
      }
    );
  }

  initializeChart() {
    if (!this.chartCanvas) {
      return;
    }
  
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
  
    // Check if there is either well-rated or not-well-rated evaluations
    if (this.wellRatedEvaluations.length === 0 && this.notWellRatedEvaluations.length === 0) {
      return;
    }
  
    // Destroy the previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }
  
    // Remove the following line, as ctx is already declared above
    // const ctx = this.chartCanvas.nativeElement.getContext('2d');
  
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Bien Notées', 'Mal Notées'],
        datasets: [{
          data: [
            this.wellRatedEvaluations.length,
            this.notWellRatedEvaluations.length
          ],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '80%',
        plugins: {
          legend: {
            display: false
          },
          
        }
      }
    });
  }
  
}
