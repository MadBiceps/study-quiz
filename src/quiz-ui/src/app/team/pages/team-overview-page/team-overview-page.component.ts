import { Component } from '@angular/core';
import { Team } from '../../models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-overview-page',
  templateUrl: './team-overview-page.component.html',
  styleUrls: ['./team-overview-page.component.scss']
})
export class TeamOverviewPageComponent {
  public addTeamOpen = false;
  public teams$: Observable<Team[] | null>;

  constructor(
    private teamService: TeamService
  ) {
    this.teams$ = this.teamService.get(undefined, undefined, undefined);
  }

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
