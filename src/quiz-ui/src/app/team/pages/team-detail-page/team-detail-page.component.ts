import { Component } from '@angular/core';

@Component({
  selector: 'app-team-detail-page',
  templateUrl: './team-detail-page.component.html',
  styleUrls: ['./team-detail-page.component.scss']
})
export class TeamDetailPageComponent {
  public team = {
    id: 'Test',
    name: 'Test',
    creationDate: new Date(),
    createdBy: 'Max Mustermann',
    memberCount: 5,
    maxMemberCount: 10,
    currentScore: 500,
    members: [{
      id: 'Test',
      username: 'Max',
      mail: 'test@test.com',
      joined: new Date()
    }],
    scores: [{
      id: 'Test',
      score: 100,
      date: new Date(),
      user: {
        id: 'Test',
        username: 'Max',
        mail: 'test@test.com'
      }
    }]
  };
}
