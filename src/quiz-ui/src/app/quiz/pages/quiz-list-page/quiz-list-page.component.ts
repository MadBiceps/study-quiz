import { Component } from '@angular/core';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
  selector: 'app-quiz-list-page',
  templateUrl: './quiz-list-page.component.html',
  styleUrls: ['./quiz-list-page.component.scss']
})
export class QuizListPageComponent {
  public showAddModal = false;

  public quizzes: Quiz[] = [
    {
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
    }
  ];

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addQuiz(quiz: Quiz) {
    // TODO: Add quiz to the list
    this.showAddModal = false;
  }
}
