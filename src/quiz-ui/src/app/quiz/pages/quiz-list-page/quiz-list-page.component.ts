import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/core/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-list-page',
  templateUrl: './quiz-list-page.component.html',
  styleUrls: ['./quiz-list-page.component.scss']
})
export class QuizListPageComponent implements OnInit {
  public showAddModal = false;

  public quizzes: Quiz[] = [];

  constructor(
    private quizService: QuizService
  ) {
  }

  ngOnInit(): void {
    this.quizService.get(undefined, undefined, undefined).subscribe(resp => {
      if (resp !== null) {
        this.quizzes = resp;
      }
    });
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addQuiz(quiz: Quiz) {
    // TODO: Add quiz to the list
    this.showAddModal = false;
    this.quizService.create(quiz).subscribe(() => {
      this.quizService.get(undefined, undefined, undefined).subscribe(resp => {
        if (resp !== null) {
          this.quizzes = resp;
        }
      });
    })
  }
}
