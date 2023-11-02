import { Component } from '@angular/core';
import { Team } from '../../models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { Observable } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-team-overview-page',
  templateUrl: './team-overview-page.component.html',
  styleUrls: ['./team-overview-page.component.scss']
})
export class TeamOverviewPageComponent {
  public addTeamOpen = false;
  public teams$: Observable<Team[] | null>;

  constructor(
    private teamService: TeamService,
    private errorService: ErrorService
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
    this.teamService.create(team).subscribe(_ => {
      this.teams$ = this.teamService.get(undefined, undefined, undefined);
    }, error => {
      this.errorService.displayError(`Error while fetching data. Status code: ${ error['status'] }. Please try it again and reload the page`);
    });
  }
}
