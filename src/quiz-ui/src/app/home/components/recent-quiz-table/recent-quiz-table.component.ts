import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-quiz-table',
  templateUrl: './recent-quiz-table.component.html',
  styleUrls: ['./recent-quiz-table.component.scss']
})
export class RecentQuizTableComponent {
  public quizzes = [{
    courseId: 'IUBH01',
    courseName: 'Test 1',
    date: new Date(),
    score: 7203
  }];
}
