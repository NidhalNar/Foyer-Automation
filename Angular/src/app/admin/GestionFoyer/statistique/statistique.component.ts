import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FoyerService } from 'src/app/services/foyer.service';
@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent {
  charttwo: any
  gouvernerat : any
  listOfNombre : any
  listOfNombreType : any
  myChart : any
  constructor(private foyerService : FoyerService) {
  
   }

  ngOnInit(): void {

    this.foyerService.countByGrouveneratNombre().subscribe(res=>{
      this.listOfNombre = res
      this.getChartOne()
    })

    this.foyerService.countByType().subscribe(res=>{
      this.listOfNombreType = res
      this.getchartTwo()
    })
    Chart.register(...registerables);
   


    this.getchartTwo()





  }

  getChartOne(){
    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: [
          "ARIANA",
          "BEJA",
          "BEN_AROUS",
          "BIZERTE",
          "GABES",
          "GAFSA",
          "JENDOUBA",
          "KAIROUAN",
          "KASSERINE",
          "KEBILI",
          "KEF",
          "MAHDIA",
          "MANOUBA",
          "MEDENINE",
          "MONASTIR",
          "NABEUL",
          "SFAX",
          "SIDI_BOUZID",
          "SILIANA",
          "SOUSSE",
          "TATAOUINE",
          "TOZEUR",
          "TUNIS",
          "ZAGHOUAN"
        ],
        
        datasets: [{
          label: 'Votes',
          data: this.listOfNombre,
          backgroundColor: [
            "#1775a3"
          ],
          borderColor: [
            '#1775a3',
          ],
          borderWidth: 1,
          
          barPercentage: 0.7,
          barThickness : 30,
          borderRadius: 8,
        }]
      },
      options: {
        scales: {
          y: {
            title: {
              display: false,
            },
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            padding: 20,
            color: 'black',
            text: 'Nombre de foyer pour chaque gouvernerat',
            font: {
              size: 16,
            },
            align: 'start',
          },
        },
      },
    });
  }



  getchartTwo() {
    const data = {
      labels: [
        'HOMMES',
        'FEMMES',
        'MIXES'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [this.listOfNombreType['HOMMES'], this.listOfNombreType['FEMMES'], this.listOfNombreType['MIXES']],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
   
    new Chart("myChartTwo", {
      type: 'doughnut',
      data: data,
    });
  }
}
