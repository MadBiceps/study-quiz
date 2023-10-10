import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
  selector: 'app-delete-quiz-modal',
  templateUrl: './delete-quiz-modal.component.html',
  styleUrls: ['./delete-quiz-modal.component.scss']
})
export class DeleteQuizModalComponent {
  @Input() quiz!: Quiz;
  @Input() open: boolean = false;
  @Output() delete: EventEmitter<Quiz> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  onClose() {
    this.close.emit();
  }

  onDelete() {
    this.delete.emit(this.quiz);
  }

}
