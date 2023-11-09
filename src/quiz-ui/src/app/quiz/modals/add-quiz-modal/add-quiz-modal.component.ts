import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
  selector: 'app-add-quiz-modal',
  templateUrl: './add-quiz-modal.component.html',
  styleUrls: ['./add-quiz-modal.component.scss']
})
export class AddQuizModalComponent {
  @Input() open = false;
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() add: EventEmitter<Quiz> = new EventEmitter(); 

  public quiz: Quiz = {
    id: '',
    title: '',
    description: '',
    questions: [],
    questionCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    creator: {
      username: '',
      mail: '',
    },
    updatedBy: {
      username: '',
      mail: '',
    },
    attempts: []
  };

  public onAdd() {
    this.add.emit(this.quiz);
    this.reset();
  }

  public onClose() {
    this.close.emit();
    this.reset();
  }

  private reset() {
    this.quiz = {
      id: '',
      title: '',
      description: '',
      questions: [],
      questionCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      creator: {
        username: '',
        mail: '',
      },
      updatedBy: {
        username: '',
        mail: '',
      },
      attempts: []
    };
  }
}
