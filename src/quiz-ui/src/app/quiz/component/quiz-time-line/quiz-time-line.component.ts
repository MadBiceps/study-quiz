import { Component, Input } from '@angular/core';
import { ClrTimelineStepState } from '@clr/angular';

export interface QuestionState {
  id: string;
  number: number;
  title: string;
  state: 'correct' | 'incorrect' | 'unanswered' | 'current';
}

@Component({
  selector: 'app-quiz-time-line',
  templateUrl: './quiz-time-line.component.html',
  styleUrls: ['./quiz-time-line.component.scss']
})
export class QuizTimeLineComponent {
  @Input() quizState: QuestionState[] = [
    {
      id: '1',
      number: 1,
      title: 'Question 1',
      state: 'correct'
    },
    {
      id: '2',
      number: 2,
      title: 'Question 2',
      state: 'incorrect'
    },
    {
      id: '3',
      number: 3,
      title: 'Question 3',
      state: 'unanswered'
    },
    {
      id: '4',
      number: 4,
      title: 'Question 4',
      state: 'current'
    },
    {
      id: '5',
      number: 5,
      title: 'Question 5',
      state: 'unanswered'
    },
  ];

  public getQuestionStateStepState(QuestionState: QuestionState) {
    switch (QuestionState.state) {
      case 'correct':
        return ClrTimelineStepState.SUCCESS;
      case 'incorrect':
        return ClrTimelineStepState.ERROR;
      case 'unanswered':
        return ClrTimelineStepState.NOT_STARTED;
      case 'current':
        return ClrTimelineStepState.CURRENT;
    }
  }
}
