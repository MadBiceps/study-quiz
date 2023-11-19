import { Component, OnInit } from '@angular/core';
import { Team, TeamMember } from '../../models/team.model';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { TeamUserService } from 'src/app/services/team-user.service';
import { TeamBoardScore } from 'src/app/core/models/team-score';

@Component({
  selector: 'app-team-detail-page',
  templateUrl: './team-detail-page.component.html',
  styleUrls: ['./team-detail-page.component.scss']
})
export class TeamDetailPageComponent implements OnInit {
  public editModelOpen = false;
  public deleteModalOpen = false;
  public team: Team | undefined;
  public user: User | undefined;
  public score: TeamBoardScore | undefined;

  constructor(
    private teamService: TeamService,
    private errorService: ErrorService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private teamUserService: TeamUserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const teamId = params['teamId'];
      this.teamService.getById(teamId).subscribe(team => {
        if(team !== null) {
          this.team = team;
        } else {
          this.errorService.displayError('Error while fetching team. Please try again later.');
        }
      }, error => {
        this.errorService.displayError(`Error while fetching team. Status ${error['status']}. Please try again later.`);
      });

      this.teamService.getScore(teamId).subscribe(score => {
        if(score !== null) {
          this.score = score;
        } else {
          this.errorService.displayError('Error while fetching team score. Please try again later.');
        }
      });
    });

    this.userService.getCurrentUserInfo().subscribe(resp => {
      if (resp !== null) {
        this.user = resp;
      }
    });
  }

  get canJoin() {
    if(this.user !== null && this.team != null) {
      return this.user?.teamId !== this.team.id;
    }
    return false;
  }

  get canLeave() {
    if(this.user !== null && this.team != null) {
      return this.user?.teamId === this.team.id;
    }
    return false;
  }

  get isOwner() {
    if(this.user !== null && this.team != null) {
      return this.user?.username === this.team.creator.username;
    }
    return false;
  }

  onJoin() {
    if(this.team !== undefined) {
      this.teamUserService.join(this.team.id).subscribe(() => {
        this.teamService.getById(this.team!.id).subscribe(resp => {
          if(resp != null) {
            this.team = resp;
          }
        });
        this.userService.getCurrentUserInfo().subscribe(resp => {
          if(resp !== null) {
            this.user = resp;
          }
        });
      })
    }
  }

  onLeave() {
    if(this.team !== undefined && this.user !== undefined) {
      this.teamUserService.remove(this.team.id, this.user.username).subscribe(() => {
        this.teamService.getById(this.team!.id).subscribe(resp => {
          if(resp != null) {
            this.team = resp;
          }
        });
        this.userService.getCurrentUserInfo().subscribe(resp => {
          if(resp !== null) {
            this.user = resp;
          }
        });
      })
    }
  }

  onRemoveMember(member: TeamMember) {
    this.teamUserService.remove(this.team!.id, member.username).subscribe(() => {
      this.teamService.getById(this.team!.id).subscribe(resp => {
        if(resp != null) {
          this.team = resp;
        }
      });
      this.userService.getCurrentUserInfo().subscribe(resp => {
        if(resp !== null) {
          this.user = resp;
        }
      });
    });
  }

  openEditModal() {
    this.editModelOpen = true;
  }

  closeEditModal() {
    this.editModelOpen = false;
  }

  updateTeam(team: Team) {
    this.editModelOpen = false;
    if(this.team !== undefined) {
      this.teamService.update(this.team).subscribe(resp => {
        if(resp !== null) {
          this.team = resp;
        }
      })
    }
  }

  openDeleteModal() {
    this.deleteModalOpen = true;
  }

  closeDeleteModal() {
    this.deleteModalOpen = false;
  }

  deleteTeam() {
    this.deleteModalOpen = false;
    if(this.team !== undefined) {
      this.teamService.delete(this.team).subscribe(() => {
        this.router.navigate(['/teams']);
      });
    }
  }

}
