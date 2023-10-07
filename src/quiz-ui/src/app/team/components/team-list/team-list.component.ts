import { Component } from '@angular/core';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent {
  public teams = [{
    id: 'Test',
    name: 'Test',
    creationDate: new Date(),
    createdBy: 'Max Mustermann',
    memberCount: 5,
    maxMemberCount: 10
  }];
}
