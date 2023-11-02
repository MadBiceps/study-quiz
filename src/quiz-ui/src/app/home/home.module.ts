import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizScoreCardComponent } from './components/quiz-score-card/quiz-score-card.component';
import { RecentQuizTableComponent } from './components/recent-quiz-table/recent-quiz-table.component';
import { LeaderboardTableComponent } from './components/leaderboard-table/leaderboard-table.component';
import { TeamLeaderboardTableComponent } from './components/team-leaderboard-table/team-leaderboard-table.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { QuizScoreGraphCardComponent } from './components/quiz-score-graph-card/quiz-score-graph-card.component';

const routes: Routes = [{
  path: '',
  component: DashboardPageComponent
}];

@NgModule({
  declarations: [
    DashboardPageComponent,
    QuizScoreCardComponent,
    RecentQuizTableComponent,
    LeaderboardTableComponent,
    TeamLeaderboardTableComponent,
    QuizScoreGraphCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
