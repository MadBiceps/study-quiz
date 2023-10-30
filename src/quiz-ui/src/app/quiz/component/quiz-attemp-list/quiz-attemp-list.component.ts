import { Component, Input, OnInit } from '@angular/core';
import { QuizAttempt } from 'src/app/core/models/quiz-attempt';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-quiz-attemp-list',
  templateUrl: './quiz-attemp-list.component.html',
  styleUrls: ['./quiz-attemp-list.component.scss']
})
export class QuizAttempListComponent implements OnInit {
  @Input() attempts: QuizAttempt[] = [];

  private user: User | undefined;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUserInfo().subscribe(resp => {
      if (resp === null)
        return;
      this.user = resp;
    });
  }

  public isOwnAttempt(username: string) {
    return this.user !== undefined && this.user.username === username;
  }

  public getFinishedQuestionCount(attempt: QuizAttempt): number {
    return attempt.questions.filter(x => x.answer !== undefined).length;
  }

  public getQuizScore(attempt: QuizAttempt): number {
    return attempt.questions.map(x => x.answer.score).reduce((a, b) => a + b);
  }
}
