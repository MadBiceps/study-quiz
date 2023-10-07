import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard-table',
  templateUrl: './leaderboard-table.component.html',
  styleUrls: ['./leaderboard-table.component.scss']
})
export class LeaderboardTableComponent {
  public leaderList =[{
    position: 1,
    username: 'Max Mustermann',
    week: 'KW 50 2023',
    score: '78.097'
  }]; 
}
