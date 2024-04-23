import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Import 'chart.js'

Chart.register(...registerables); 
import { ChambreService } from 'src/app/services/ChambreService/chambre.service';


@Component({
  selector: 'app-statistique-chambre',
  templateUrl: './statistique-chambre.component.html',
  styleUrls: ['./statistique-chambre.component.css']
})
export class StatistiqueChambreComponent implements OnInit, AfterViewInit {
  statistics: any[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  constructor(private chambreservice: ChambreService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  ngAfterViewInit(): void {
    // After the view is initialized, render the chart
    this.renderChart();
  }

  loadStatistics(): void {
    this.chambreservice.getStatistiqueBlocs().subscribe(
      data => {
        // Simplify the logic for filtering reserved and non-reserved statistics
        this.statistics = data;
  
        // After loading data, render the chart
        this.renderChart();
      },
      error => {
        console.error('Error loading statistics:', error);
      }
    );
  }
  
  
  renderChart(): void {
    if (this.statistics.length === 0 || !this.chartCanvas) {
      return;
    }
  
  
   const chartData = {
  labels: this.statistics.map(statistic => statistic.nomBloc),
  datasets: [
 

    
    {
      label: 'Nombre de chambres réservées',
      data: this.statistics.map(statistic => (statistic.estReserve ? statistic.nombreChambres : 0)),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    },
    {
      label: 'Nombre de chambres non réservées',
      data: this.statistics.map(statistic => (statistic.estReserve ? 0 : statistic.nombreChambres)),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
    
  ]
};

    
  
  

  
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      
    });
  }
}