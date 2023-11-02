import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Leaderboard } from 'src/app/core/models/leaderboard.model';
import { QuizAttempt } from 'src/app/core/models/quiz-attempt';
import { User } from 'src/app/core/models/user.model';
import { UserScore } from 'src/app/models/user-score.model';
import { ScoreService } from 'src/app/services/score.service';
import { Team } from 'src/app/team/models/team.model';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public userScore: UserScore | undefined;
  public userQuiz: QuizAttempt[] = [];
  public teamLeaderboard: Leaderboard<Team>[] = [];
  public userLeaderboard: Leaderboard<User>[] = [];

  constructor(
    private router: Router, 
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    this.scoreService.getUserScore().subscribe(resp => {
      if(resp !== null) {
        this.userScore = resp;
      }
    });

    this.scoreService.getUserQuizzes().subscribe(resp => {
      if(resp !== null) {
        this.userQuiz = resp;
      }
    });

    this.scoreService.getTeamLeaderboard().subscribe(resp => {
      if(resp !== null) {
        this.teamLeaderboard = resp;
      }
    });

    this.scoreService.getUserLeaderboard().subscribe(resp => {
      if(resp !== null) {
        this.userLeaderboard = resp;
      }
    });
  }

  public goToQuiz() {
    this.router.navigate(['/quizzes']);
  }

  public goToTeam() {
    this.router.navigate(['/teams']);
  }

}
