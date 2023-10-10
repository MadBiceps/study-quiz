import { Component, Input } from '@angular/core';
import { TeamScore } from '../../models/team.model';

@Component({
  selector: 'app-team-score-list',
  templateUrl: './team-score-list.component.html',
  styleUrls: ['./team-score-list.component.scss']
})
export class TeamScoreListComponent {
  @Input() scores: TeamScore[] | undefined = [];
}
