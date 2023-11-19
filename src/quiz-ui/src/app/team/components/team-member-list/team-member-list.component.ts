import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamMember } from '../../models/team.model';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss']
})
export class TeamMemberListComponent {
  @Input() members: TeamMember[] | undefined = [];
  @Input() isOwner: boolean = false;
  @Output() removeMember: EventEmitter<TeamMember> = new EventEmitter<TeamMember>();

  constructor() { }

  public remove(member: TeamMember) {
    this.removeMember.emit(member);
  }
}
