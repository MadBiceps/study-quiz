import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, map, of } from 'rxjs';
import { QuizAttempt, QuizAttemptQuestion } from 'src/app/core/models/quiz-attempt';
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
  public status: 'loading' | 'start' | 'finish' | 'error' | 'continue' | 'running' = 'loading';
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
    // TODO: Add status analysis
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
                  isSelected: this.setSelectionState(question, x.id),
                  isCorrect: x.isCorrect,
                  comment: x.reason
                };
              })
            })
          });
        }
        this.setQuizState();
      }, error => {
        this.errorMessage = error;
        this.status = 'error';
      });
    })
  }

  public setQuizState() {
    const notAnsweredQuestionCount = this.attempt?.questions.filter(x => x.answer === null).length;
    if (notAnsweredQuestionCount === 0) {
      this.status = 'finish';
      return;
    }

    if (this.attempt === undefined) {
      this.status = 'error';
      return;
    }

    if(notAnsweredQuestionCount === this.questions.length) {
      this.status = 'start';
      return;
    }

    this.status = 'continue';
    this.attempt.questions.sort((a,b) => b.order - a.order).forEach(question => {
      if (question.answer === null) {
        this.currentQuestionId = this.questions.findIndex(x => x.id === question.question.id);
      }
    });
  }

  public setSelectionState(question: QuizAttemptQuestion, answerId: string) {
    if(question.answer === null)
      return false;
    return question.answer.answer.id === answerId;
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
              isSelected: this.setSelectionState(y, z.id),
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
    }, error => {
      this.errorMessage = error;
      this.status = 'error';
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
    console.log(this.questions);
    return this.questions.filter(question => question.options.find(option => option.isCorrect === true && option.isSelected === true)).length;
  }

  public get score() {
    let correctQuestionCount = this.correctQuestionCount;
    let incorrectQuestionCount = this.questions.length - correctQuestionCount;
    return correctQuestionCount * 10 - incorrectQuestionCount * 5;
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
