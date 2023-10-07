import { Component } from '@angular/core';

@Component({
  selector: 'app-team-leaderboard-table',
  templateUrl: './team-leaderboard-table.component.html',
  styleUrls: ['./team-leaderboard-table.component.scss']
})
export class TeamLeaderboardTableComponent {
  public teamList =[{
    position: 1,
    name: 'Team 01',
    week: 'KW 50 2023',
    score: '78.097'
  }]; 
}
