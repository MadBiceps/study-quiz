import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-quiz-score-card',
  templateUrl: './quiz-score-card.component.html',
  styleUrls: ['./quiz-score-card.component.scss']
})
export class QuizScoreCardComponent {
  @Input() public title: string = 'Your Score';
  @Input() public actionTitle: string | undefined = 'Go to Quiz';
  @Input() public score: number | undefined;
  @Output() public action: EventEmitter<void> = new EventEmitter();

  public chart: Chart | undefined;

  public onAction(): void {
    this.action.emit();
  }
}
