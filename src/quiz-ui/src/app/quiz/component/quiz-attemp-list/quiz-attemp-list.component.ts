import { Component, Input } from '@angular/core';
import { QuizAttempt } from 'src/app/core/models/quiz-attempt';

@Component({
  selector: 'app-quiz-attemp-list',
  templateUrl: './quiz-attemp-list.component.html',
  styleUrls: ['./quiz-attemp-list.component.scss']
})
export class QuizAttempListComponent {
  @Input() attempts: QuizAttempt[] = [];

  public getFinishedQuestionCount(attempt: QuizAttempt): number {
    return attempt.attemptAnswers.filter(x => x.answer !== undefined).length;
  }

  public getQuizScore(attempt: QuizAttempt): number {
    return attempt.attemptAnswers.map(x => x.resultingScore).reduce((a, b) => a + b);
  }
}
