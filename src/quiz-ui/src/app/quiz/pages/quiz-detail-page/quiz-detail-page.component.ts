import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-detail-page',
  templateUrl: './quiz-detail-page.component.html',
  styleUrls: ['./quiz-detail-page.component.scss']
})
export class QuizDetailPageComponent {
  public quiz = {
    id: 'Test',
    title: 'Test',
    description: 'Test',
    questions: [],
    questionCount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: {
      username: 'Test',
      mail: 'Test',
    },
    updatedBy: {
      username: 'Test',
      mail: 'Test',
    }
  };

  constructor(
    private router: Router
  ) {

  }

  onStartQuiz() {
    // TODO: Implement hear the quiz instance creation request
    this.router.navigate([this.router.url, 'attempt', 'attemptId' ]);
  }
}
