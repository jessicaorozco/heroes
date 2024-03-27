import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {


  @Input() data = {
    labels: ['`SuperFuerza`', 'Inteligencia', 'Sentido Arácnido, ', 'Tecnologìa'],
    datasets: [
      {
        label: 'Name',
        backgroundColor: '#42A5F5',
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'Power',
        backgroundColor: '#FFA726',
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };
  
  @Input() options = {
    title: {
      display: true,
      text: 'Heroes',
      fontSize: 16
    },
    legend: {
      position: 'bottom'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };


  constructor(){
  }
  
  ngOnInit() {

    
  }


}
