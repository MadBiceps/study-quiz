import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/core/models/question.model';
import { Quiz } from 'src/app/core/models/quiz.model';
import { QuizAttemptService } from 'src/app/services/quiz-attempt.service';
import { QuizQuestionService } from 'src/app/services/quiz-question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-detail-page',
  templateUrl: './quiz-detail-page.component.html',
  styleUrls: ['./quiz-detail-page.component.scss']
})
export class QuizDetailPageComponent implements OnInit {
  public showDeleteModal = false;
  public showUpdateModal = false;
  public showAddQuestionModal = false;
  public showUpdateQuestionModal = false;
  public selectedQuestion: Question | undefined;

  public quiz: Quiz | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private quizAttemptService: QuizAttemptService,
    private quizQuestionService: QuizQuestionService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.quizService.getById(params['id']).subscribe(resp => {
        if (resp !== null)
          this.quiz = resp;
      })
    });
  }

  onStartQuiz() {
    // Creating quiz attempt and navigating to it
    if (this.quiz !== undefined) {
      this.quizAttemptService.create(this.quiz.id).subscribe(resp => {
        if (resp !== null) {
          this.router.navigate([this.router.url, 'attempt', resp.id]);
        }
      });
    }
  }

  onAddQuestion() {
    this.showAddQuestionModal = true;
  }

  onUpdateQuestion(question: Question) {
    this.selectedQuestion = question;
    this.showUpdateQuestionModal = true;
  }

  onDelete() {
    this.showDeleteModal = true;
  }

  deleteQuiz() {
    this.showDeleteModal = false;
    if (this.quiz !== undefined)
      this.quizService.delete(this.quiz).subscribe(() => {
        this.router.navigate(['/quizzes']);
      });
  }

  onUpdate() {
    this.showUpdateModal = true;
  }

  update(quiz: Quiz) {
    this.quiz = quiz;
    this.showUpdateModal = false;
    this.quizService.update(quiz).subscribe(() => {
      this.quizService.getById(quiz.id).subscribe(resp => {
        if (resp !== null)
          this.quiz = resp;
      });
    });
  }

  close() {
    this.showUpdateModal = false;
    this.showDeleteModal = false;
    this.showAddQuestionModal = false;
    this.showUpdateQuestionModal = false;
  }

  createQuestion(question: Question) {
    this.quiz?.questions.push(question);
    this.showAddQuestionModal = false;

    if (this.quiz !== undefined)
      this.quizQuestionService.create(this.quiz.id, question).subscribe(() => {
        this.quizService.getById(this.quiz!.id).subscribe(resp => {
          if (resp !== null)
            this.quiz = resp;
        })
      });
  }

  updateQuestion(question: Question) {
    if (this.quiz !== undefined) {
      this.showUpdateQuestionModal = false;
      this.selectedQuestion = undefined;
      this.quizQuestionService.update(this.quiz.id, question).subscribe(_ => {
        this.quizService.getById(this.quiz!.id).subscribe(resp => {
          if (resp !== null)
            this.quiz = resp;
        })
      })
    }
  }
}
