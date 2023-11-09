import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer, Question } from 'src/app/core/models/question.model';

@Component({
  selector: 'app-edit-question-modal',
  templateUrl: './edit-question-modal.component.html',
  styleUrls: ['./edit-question-modal.component.scss']
})
export class EditQuestionModalComponent {
  @Input() public open: boolean = false;
  @Input() public question: Question | undefined;
  @Output() public close: EventEmitter<void> = new EventEmitter();
  @Output() public update: EventEmitter<Question> = new EventEmitter();
  @Output() public delete: EventEmitter<Question> = new EventEmitter();

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

  constructor() { }

  public addAnswer() {
    (this.question as Question).answers.push({
      ...this.answer,
      id: (this.question as Question).answers.length.toString(),
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
    let moreThan2 = (this.question as Question).answers.length > 1;
    let oneCorrect = (this.question as Question).answers.find(answer => answer.isCorrect);

    return moreThan2 && oneCorrect;
  }

  public removeAnswer(id: string) {
    (this.question as Question).answers = (this.question as Question).answers.filter(answer => answer.id !== id);
  }

  public onClose() {
    this.close.emit();

  }

  public onUpdate() {
    this.update.emit(this.question as Question);
  }

  public onDelete() {
    this.delete.emit(this.question as Question);
  }

}
