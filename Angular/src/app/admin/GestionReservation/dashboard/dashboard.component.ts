// dashboard.component.ts

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EtudiantService } from 'src/app/services/serviceEtudiant/etudiant.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public chartData: any = {};

  constructor(private etudiantService: EtudiantService) { }

 
  ngOnInit(): void {
    this.etudiantService.getEtudiantStatistics().subscribe(data => {
      this.chartData = data;
      this.generateChart();
    });
  }
  generateChart() {
    // Logic to generate the pie chart using Chart.js
    // You can customize this based on the structure of your data
    const ctx = document.getElementById('etudiantsChart') as HTMLCanvasElement;
    const etudiantsChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Utilisateurs', 'Utilisateurs avec réservations'],
        datasets: [{
          data: [this.chartData.totalEtudiants, this.chartData.etudiantsWithReservations],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}  