import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Chart, { registerables } from 'chart.js/auto';

@Component({
  selector: 'app-quiz-score-graph-card',
  templateUrl: './quiz-score-graph-card.component.html',
  styleUrls: ['./quiz-score-graph-card.component.scss']
})
export class QuizScoreGraphCardComponent implements OnInit {
  @Input() public title: string = 'Your Score';
  @Input() public actionTitle: string | undefined = 'Go to Quiz';
  @Input() public timeData: {
    time: Date;
    value: number
  }[] = [];
  @Output() public action: EventEmitter<void> = new EventEmitter();

  public chart: Chart | undefined;

  ngOnInit(): void {
    const ctx = document.getElementById('scoreChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.timeData.map(x => + (new Date(x.time)).getFullYear() + '/' + (new Date(x.time)).getMonth()),
        datasets: [{
          label: 'Score',
          data: this.timeData.map(x => x.value),
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
    Chart.register(...registerables);
  }

  public onAction(): void {
    this.action.emit();
  }
}
