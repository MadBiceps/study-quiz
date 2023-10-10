import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-delete-team-modal',
  templateUrl: './delete-team-modal.component.html',
  styleUrls: ['./delete-team-modal.component.scss']
})
export class DeleteTeamModalComponent {
  @Input() open = false;
  @Input() team!: Team;
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  onClose() {
    this.close.emit();
  }

  onDelete() {
    this.delete.emit();
  }

}
