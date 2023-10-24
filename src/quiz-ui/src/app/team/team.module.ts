import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamOverviewPageComponent } from './pages/team-overview-page/team-overview-page.component';
import { TeamDetailPageComponent } from './pages/team-detail-page/team-detail-page.component';
import { Route, RouterModule } from '@angular/router';
import { TeamListComponent } from './components/team-list/team-list.component';
import { ClarityModule } from '@clr/angular';
import { TeamScoreListComponent } from './components/team-score-list/team-score-list.component';
import { TeamMemberListComponent } from './components/team-member-list/team-member-list.component';
import { AddTeamModalComponent } from './modals/add-team-modal/add-team-modal.component';
import { EditTeamModalComponent } from './modals/edit-team-modal/edit-team-modal.component';
import { DeleteTeamModalComponent } from './modals/delete-team-modal/delete-team-modal.component';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [{
  path: '',
  component: TeamOverviewPageComponent
}, {
  path: ':teamId',
  component: TeamDetailPageComponent
}];

@NgModule({
  declarations: [
    TeamOverviewPageComponent,
    TeamDetailPageComponent,
    TeamListComponent,
    TeamScoreListComponent,
    TeamMemberListComponent,
    AddTeamModalComponent,
    EditTeamModalComponent,
    DeleteTeamModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ClarityModule,
    FormsModule,
  ]
})
export class TeamModule { }
