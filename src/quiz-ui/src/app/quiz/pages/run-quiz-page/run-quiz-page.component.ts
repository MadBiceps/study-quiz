import { Component } from '@angular/core';
import { delay, of } from 'rxjs';

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
export class RunQuizPageComponent {
  public status: 'loading' | 'start' | 'finish' | 'error' | 'continue' | 'running' = 'start' //'loading';
  public questionState: 'display' | 'answer' | 'result' = 'display';
  public currentQuestionId = 0;
  public errorMessage = '';
  public questions = [{
    id: '1',
    title: 'Question 1',
    description: 'Question 1',
    options: [
      {
        id: '1',
        text: 'Option 1',
        isSelected: false,
      },
      {
        id: '2',
        text: 'Option 2',
        isSelected: false,
      },
      {
        id: '3',
        text: 'Option 3',
        isSelected: false,
      },
      {
        id: '4',
        text: 'Option 4',
        isSelected: false,
      },
    ]
  },
  {
    id: '2',
    title: 'Question 2',
    description: 'Question 2',
    options: [
      {
        id: '1',
        text: 'Option 1',
        isSelected: false,
      },
      {
        id: '2',
        text: 'Option 2',
        isSelected: false,
      },
      {
        id: '3',
        text: 'Option 3',
        isSelected: false,
      },
      {
        id: '4',
        text: 'Option 4',
        isSelected: false,
      },
    ],
  },
  {
    id: '3',
    title: 'Question 3',
    description: 'Question 3',
    options: [
      {
        id: '1',
        text: 'Option 1',
        isSelected: false,
      },
      {
        id: '2',
        text: 'Option 2',
        isSelected: false,
      },
      {
        id: '3',
        text: 'Option 3',
        isSelected: false,
      },
    ]
  }] as Question[];

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
    of({
      id: this.currentQuestion.id,
      title: this.currentQuestion.title,
      description: this.currentQuestion.description,
      options: this.currentQuestion.options.map(option => {
        return {
          id: option.id,
          text: option.text,
          isCorrect: option.id === id,
          isSelected: option.id === id,
          comment: 'Description' + option.id
        }
      })
    }).pipe(
      delay(1000)
    ).subscribe(result => {
      // TODO: Update the question state with the result
      this.questionState = 'result';
      this.questions[this.currentQuestionId] = result;
    });
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
