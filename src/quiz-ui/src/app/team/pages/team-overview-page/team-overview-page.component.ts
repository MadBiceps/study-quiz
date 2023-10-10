import { Component } from '@angular/core';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-team-overview-page',
  templateUrl: './team-overview-page.component.html',
  styleUrls: ['./team-overview-page.component.scss']
})
export class TeamOverviewPageComponent {
  public addTeamOpen = false;

  public onAddTeam(): void {
    this.addTeamOpen = true;
  }

  public onCloseAddTeam(): void {
    this.addTeamOpen = false;
  }

  public addTeam(team: Team) {
    this.addTeamOpen = false;
    console.log('Add Team');
  }
}
