import { Component, Input } from '@angular/core';
import { Question } from 'src/app/core/models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent {
  @Input() public questions: Question[] = [];
}
