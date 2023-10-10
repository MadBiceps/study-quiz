import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/app/core/models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {
  @Input() public questions: Question[] = [];
  @Output() public select: EventEmitter<Question> = new EventEmitter();

  onSelect(question: Question) {
    this.select.emit(question);
  }
}
