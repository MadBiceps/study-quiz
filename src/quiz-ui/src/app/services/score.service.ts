import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { UserScore } from '../models/user-score.model';
import { QuizAttempt } from '../core/models/quiz-attempt';
import { Leaderboard } from '../core/models/leaderboard.model';
import { User } from '../core/models/user.model';
import { Team } from '../team/models/team.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(
    private apiService: ApiService
  ) { }

  public getUserScore() {
    return this.apiService.MakeSecureGetRequest<UserScore>('v1/score').pipe(map(x => x.body));
  }

  public getUserQuizzes() {
    return this.apiService.MakeSecureGetRequest<QuizAttempt[]>('v1/score/quizzes').pipe(map(x => x.body));
  }

  public getUserLeaderboard() {
    return this.apiService.MakeSecureGetRequest<Leaderboard<User>[]>(`v1/score/leaderboard/user`).pipe(map(x => x.body));
  }

  public getTeamLeaderboard() {
    return this.apiService.MakeSecureGetRequest<Leaderboard<Team>[]>(`v1/score/leaderboard/team`).pipe(map(x => x.body));
  }
}
