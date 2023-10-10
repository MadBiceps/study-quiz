import { Component, Input } from '@angular/core';
import { TeamMember } from '../../models/team.model';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss']
})
export class TeamMemberListComponent {
  @Input() members: TeamMember[] | undefined = [];
}
