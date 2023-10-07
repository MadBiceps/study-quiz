import { Component } from '@angular/core';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
  selector: 'app-quiz-list-page',
  templateUrl: './quiz-list-page.component.html',
  styleUrls: ['./quiz-list-page.component.scss']
})
export class QuizListPageComponent {
  public quizzes: Quiz[] = [
    {
      id: 'Test',
      title: 'Test',
      description: 'Test',
      question: [],
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
    }
  ];
}
