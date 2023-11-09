import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-add-team-modal',
  templateUrl: './add-team-modal.component.html',
  styleUrls: ['./add-team-modal.component.scss']
})
export class AddTeamModalComponent {
  @Input() open: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() addTeam = new EventEmitter<Team>();

  public team: Team = {
    id: '',
    name: '',
    createdAt: new Date(),
    creator: {
      username: '',
      mail: ''
    },
    memberCount: 0,
    maxMemberCount: 0,
    members: undefined,
    scores: [],
    currentScore: 0
  }

  public onClose(): void {
    this.close.emit();
    this.reset();
  }

  public onAddTeam(): void {
    this.addTeam.emit(this.team);
    this.reset();
  }

  private reset() {
    this.team = {
      id: '',
      name: '',
      createdAt: new Date(),
      creator: {
        username: '',
        mail: ''
      },
      memberCount: 0,
      maxMemberCount: 0,
      members: undefined,
      scores: [],
      currentScore: 0
    }
  }
}
