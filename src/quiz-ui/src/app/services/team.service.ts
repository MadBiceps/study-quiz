import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Team, TeamScore } from '../team/models/team.model';
import { map } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { TeamBoardScore } from '../core/models/team-score';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private apiService: ApiService
  ) { }

  public get(searchTerm: string | undefined, page: number | undefined, pageSize: number | undefined) {
    let query = new HttpParams();
    if(searchTerm !== undefined && searchTerm !== '')
      query = query.set('searchTerm', searchTerm);

    if (page !== undefined && pageSize !== undefined) {
      query = query.set('page', page);
      query =query.set('pageSize', pageSize);
    }

    return this.apiService.MakeSecureGetRequest<Team[]>('v1/teams', query).pipe(map(x => x.body));
  }

  public getById(id: string) {
    return this.apiService.MakeSecureGetRequest<Team>('v1/teams/' + id).pipe(map(x => x.body));
  }

  public getScore(teamId: string) {
    return this.apiService.MakeSecureGetRequest<TeamBoardScore>('v1/teams/' + teamId + '/score').pipe(map(x => x.body));
  }

  public create(team: Team) {
    return this.apiService.MakeSecurePostRequest<Team>('v1/teams', {
      name: team.name
    }).pipe(map(x => x.body));
  }

  public update(team: Team) {
    return this.apiService.MakeSecurePutRequest<Team>('v1/teams/' + team.id, {
      name: team.name
    }).pipe(map(x => x.body));
  }

  public delete(team: Team) {
    return this.apiService.MakeSecureDeleteRequest<void>('v1/teams/' + team.id).pipe(map(x => x.body));
  }
}
