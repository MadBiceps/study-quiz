import { Component } from '@angular/core';
import { Team } from '../../models/team.model';
import { treeFeaturesFactory } from '@clr/angular/data/tree-view/tree-features.service';

@Component({
  selector: 'app-team-detail-page',
  templateUrl: './team-detail-page.component.html',
  styleUrls: ['./team-detail-page.component.scss']
})
export class TeamDetailPageComponent {
  public editModelOpen = false;
  public deleteModalOpen = false;
  public team: Team = {
    id: 'Test',
    name: 'Test',
    creationDate: new Date(),
    createdBy: {
      username: 'Max Mustermann',
      mail: 'test@test.com'
    },
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
        username: 'Max',
        mail: 'test@test.com'
      }
    }]
  };

  openEditModal() {
    this.editModelOpen = true;
  }

  closeEditModal() {
    this.editModelOpen = false;
  }

  updateTeam(team: Team) {
    // TODO: Add update rutine
    this.editModelOpen = false;
  }

  openDeleteModal() {
    this.deleteModalOpen = true;
  }

  closeDeleteModal() {
    this.deleteModalOpen = false;
  }

  deleteTeam() {
    // TODO: Add delete rutine
    this.deleteModalOpen = false;
  }

}
