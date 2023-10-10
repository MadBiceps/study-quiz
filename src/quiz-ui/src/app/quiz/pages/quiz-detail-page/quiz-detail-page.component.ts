import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/core/models/question.model';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
  selector: 'app-quiz-detail-page',
  templateUrl: './quiz-detail-page.component.html',
  styleUrls: ['./quiz-detail-page.component.scss']
})
export class QuizDetailPageComponent {
  public showDeleteModal = false;
  public showUpdateModal = false;
  public showAddQuestionModal = false;
  public showUpdateQuestionModal = false;
  public selectedQuestion: Question | undefined;

  public quiz: Quiz = {
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

  onAddQuestion() {
    this.showAddQuestionModal = true;
  }

  onUpdateQuestion(question: Question) {
    this.selectedQuestion = question;
    this.showUpdateQuestionModal = true;
  }

  onDelete () {
    this.showDeleteModal = true;
  }

  deleteQuiz() {
    // TODO: Implement delete request
    this.showDeleteModal = false;
  }

  onUpdate() {
    this.showUpdateModal = true;
  }

  update(quiz: Quiz) {
    // TODO: Add update request
    this.quiz = quiz;
    this.showUpdateModal = false;
  }

  close() {
    this.showUpdateModal = false;
    this.showDeleteModal = false;
    this.showAddQuestionModal = false;
    this.showUpdateQuestionModal = false;
  }

  createQuestion(question: Question) {
    this.quiz.questions.push(question);
    this.showAddQuestionModal = false;
  }

  updateQuestion(question: Question) {
    this.quiz.questions[this.quiz.questions.findIndex(q => q.id === question.id)] = question;
    this.showUpdateQuestionModal = false;
    this.selectedQuestion = undefined;
  }
}
