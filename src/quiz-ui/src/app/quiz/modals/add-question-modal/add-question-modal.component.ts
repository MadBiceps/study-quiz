import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer, Question } from 'src/app/core/models/question.model';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss']
})
export class AddQuestionModalComponent {
  @Input() public open = false;
  @Output() public close: EventEmitter<void> = new EventEmitter();
  @Output() public add: EventEmitter<Question> = new EventEmitter();

  public answer: Answer = {
    id: '',
    label: '',
    reason: '',
    isCorrect: false,
    creator: {
      username: '',
      mail: '',
    },
    createdAt: new Date(),
    editedBy: {
      username: '',
      mail: '',
    },
    editedAt: new Date(),
  }

  public question: Question = {
    id: '',
    label: '',
    hint: '',
    answers: [],
    creator: {
      username: '',
      mail: '',
    },
    createdAt: new Date(),
    editedBy: {
      username: '',
      mail: '',
    },
    editedAt: new Date(),
  };

  constructor() { }

  public addAnswer() {
    this.question.answers.push({
      ...this.answer,
      id: this.question.answers.length.toString(),
    });
    this.answer = {
      id: '',
      label: '',
      reason: '',
      isCorrect: false,
      creator: {
        username: '',
        mail: '',
      },
      createdAt: new Date(),
      editedBy: {
        username: '',
        mail: '',
      },
      editedAt: new Date(),
    };
  }

  public checkAnswers() {
    let moreThan2 = this.question.answers.length > 1;
    let oneCorrect = this.question.answers.find(answer => answer.isCorrect);

    return moreThan2 && oneCorrect;
  }

  public removeAnswer(id: string) {
    this.question.answers = this.question.answers.filter(answer => answer.id !== id);
  }

  public onClose() {
    this.close.emit();
    this.reset();
  }

  public onAdd() {
    this.add.emit(this.question);
    this.reset();
  }

  private reset() {
    this.question = {
      id: '',
      label: '',
      hint: '',
      answers: [],
      creator: {
        username: '',
        mail: '',
      },
      createdAt: new Date(),
      editedBy: {
        username: '',
        mail: '',
      },
      editedAt: new Date(),
    };
  } 
}
