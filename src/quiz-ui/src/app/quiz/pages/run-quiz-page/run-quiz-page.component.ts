import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, map, of } from 'rxjs';
import { QuizAttempt } from 'src/app/core/models/quiz-attempt';
import { QuizAttemptService } from 'src/app/services/quiz-attempt.service';

export interface Question {
  id: string;
  title: string;
  description: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean | undefined;
  isSelected: boolean;
  comment: string | undefined;
}

@Component({
  selector: 'app-run-quiz-page',
  templateUrl: './run-quiz-page.component.html',
  styleUrls: ['./run-quiz-page.component.scss']
})
export class RunQuizPageComponent implements OnInit {
  public status: 'loading' | 'start' | 'finish' | 'error' | 'continue' | 'running' = 'start' //'loading';
  public questionState: 'display' | 'answer' | 'result' = 'display';
  public currentQuestionId = 0;
  public errorMessage = '';
  public attempt: QuizAttempt | undefined;
  public questions = [] as Question[];

  constructor(
    private quizAttemptService: QuizAttemptService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.quizAttemptService.getById(params['attemptId']).subscribe(resp => {
        if (resp !== null) {
          this.attempt = resp;
          resp.questions.sort((a,b) => a.order - b.order).forEach(question => {
            this.questions.push({
              id: question.question.id,
              title: question.question.label,
              description: question.question.hint,
              options: question.question.answers.map(x => {
                return {
                  id: x.id,
                  text: x.label,
                  isSelected: false,
                  isCorrect: x.isCorrect,
                  comment: x.reason
                };
              })
            })
          });
        }
      });
    })
  }

  public get currentQuestion() {
    return this.questions[this.currentQuestionId];
  }

  public onSelectAnswer(id: string) {
    if (this.questionState === 'display') {
      this.currentQuestion.options.forEach(option => {
        option.isSelected = option.id === id;
      });
      this.questionState = 'answer';
    }

    // TODO: Check if the anwser is correct with backend system

    if(this.attempt === undefined) {
      return;
    }

    this.quizAttemptService.update(this.attempt.id, this.questions[this.currentQuestionId].id, id).pipe(map(x => {
      if(x === null)
        return x;
      return x.questions.sort((a, b) => a.order - b.order).map(y => {
        return {
          id: y.question.id,
          title: y.question.label,
          description: y.question.hint,
          options: y.question.answers.map(z => {
            return {
              id: z.id,
              text: z.label,
              isSelected: this.getSelectionState(y.id, z.id),
              isCorrect: z.isCorrect,
              comment: z.reason
            }
          })
        }
      }) as Question[];
    }), delay(1000)).subscribe(x => {
      this.questionState = 'result';
      if(x == null)
        return;
      const question = x.find(y => y.id === this.questions[this.currentQuestionId].id);
      if (question !== undefined)
        this.questions[this.currentQuestionId] = question;
    });
  }

  public getSelectionState(questionId: string, answerId: string) {
    return this.questions.find(x => x.id === questionId)?.options.find(x => x.id === answerId)?.isSelected;
  }

  public onNextQuestion() {
    if (this.questions.length === this.currentQuestionId + 1) {
      this.status = 'finish';
      return;
    }
    this.currentQuestionId++;
    this.questionState = 'display';
  }

  public get correctQuestionCount() {
    return this.questions.filter(question => question.options.find(option => option.isCorrect && option.isSelected)).length;
  }

  public get score() {
    let correctQuestionCount = this.correctQuestionCount;
    let incorrectQuestionCount = this.questions.length - correctQuestionCount;
    return correctQuestionCount * 5 - incorrectQuestionCount * 2;
  }

  public getQuestionCssCLass(questionId: string) {
    switch (this.questionState) {
      case 'display':
        return 'no-answer-selected';
      case 'answer':
        return this.questions[this.currentQuestionId].options.find(option => option.id === questionId)?.isSelected ? 'answer-selected' : 'other-answer-selected';
      case 'result':
        return this.questions[this.currentQuestionId].options.find(option => option.id === questionId)?.isCorrect ? 'correct-answer' : 'incorrect-answer';
    }
  }

  onStartQuiz() {
    this.status = 'running';
  }

}
