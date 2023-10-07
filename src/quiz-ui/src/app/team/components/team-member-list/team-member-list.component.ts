import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.scss']
})
export class TeamMemberListComponent {
  @Input() members: {
    id: string;
    username: string;
    mail: string;
    joined: Date;
  }[] = [];
}
