import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-team-score-chart',
  templateUrl: './team-score-chart.component.html',
  styleUrls: ['./team-score-chart.component.scss']
})
export class TeamScoreChartComponent implements OnInit {
  @Input() scores: {
    time: Date;
    value: number;
  }[] = [];

  public chart: Chart | undefined;

  ngOnInit(): void {
    const ctx = document.getElementById('scoreChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.scores.map(x => + (new Date(x.time)).getFullYear() + '/' + (new Date(x.time)).getMonth()),
        datasets: [{
          label: 'Score',
          data: this.scores.map(x => x.value),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
