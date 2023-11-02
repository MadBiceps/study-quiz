import { Component, Input } from '@angular/core';
import { Leaderboard } from 'src/app/core/models/leaderboard.model';
import { User } from 'src/app/core/models/user.model';
import { Team } from 'src/app/team/models/team.model';

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
  
  @Input() public leaderUserList: Leaderboard<User>[] | undefined;
  @Input() public leaderTeamList: Leaderboard<Team>[] | undefined;
}
