import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-score-card',
  templateUrl: './quiz-score-card.component.html',
  styleUrls: ['./quiz-score-card.component.scss']
})
export class QuizScoreCardComponent {
  @Input() public title: string = 'Your Score';
  @Input() public actionTitle: string | undefined = 'Go to Quiz';
  @Input() public score: number = 0;
  @Output() public action: EventEmitter<void> = new EventEmitter();

  public onAction(): void {
    this.action.emit();
  }
}
