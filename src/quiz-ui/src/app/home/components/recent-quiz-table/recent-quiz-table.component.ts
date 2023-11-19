import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuizAttempt } from 'src/app/core/models/quiz-attempt';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-recent-quiz-table',
  templateUrl: './recent-quiz-table.component.html',
  styleUrls: ['./recent-quiz-table.component.scss']
})
export class RecentQuizTableComponent {
  @Input() quizzes: QuizAttempt[] = [];

  constructor(private quizService: QuizService, private router: Router) {

  }

  public getScore(attempt: QuizAttempt): number {
    const resp = attempt.questions.map(x => x.answer?.score ?? 0).reduce((a, b) => a + b);
    if(Number.isNaN(resp))
      return 0;
    return resp;
  }

  public continueQuiz(attempt: QuizAttempt) {
    if(attempt.finishedAt === null) {
      this.router.navigate(['/quizzes', attempt.quizId, 'attempt', attempt.id]);
    }
  }
}
