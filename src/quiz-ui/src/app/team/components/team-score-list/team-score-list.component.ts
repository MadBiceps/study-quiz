import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-team-score-list',
  templateUrl: './team-score-list.component.html',
  styleUrls: ['./team-score-list.component.scss']
})
export class TeamScoreListComponent {
  @Input() scores: {
    id: string;
    score: number;
    date: Date;
    user: {
      id: string;
      username: string;
      mail: string;
    }
  }[] = [];
}
