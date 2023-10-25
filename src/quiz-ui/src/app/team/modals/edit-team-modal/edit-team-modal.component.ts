import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-edit-team-modal',
  templateUrl: './edit-team-modal.component.html',
  styleUrls: ['./edit-team-modal.component.scss']
})
export class EditTeamModalComponent {
  @Input() open = false;
  @Input() team: Team = {
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
  };
  @Output() close = new EventEmitter<void>();
  @Output() updateTeam = new EventEmitter<Team>();

  onUpdateTeam(): void {
    this.updateTeam.emit(this.team);
  }

  onClose(): void {
    this.close.emit();
  }
}
