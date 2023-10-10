import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from 'src/app/core/models/quiz.model';

@Component({
  selector: 'app-update-quiz-modal',
  templateUrl: './update-quiz-modal.component.html',
  styleUrls: ['./update-quiz-modal.component.scss']
})
export class UpdateQuizModalComponent {
  @Input() open = false;
  @Input() quiz!: Quiz;
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() update: EventEmitter<Quiz> = new EventEmitter();

  public onClose() {
    this.close.emit();
  }

  public onUpdate() {
    this.update.emit(this.quiz);
  }
}
