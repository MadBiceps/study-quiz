import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Team } from '../team/models/team.model';
import { map } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private apiService: ApiService
  ) { }

  public get(searchTerm: string | undefined, page: number | undefined, pageSize: number | undefined) {
    let param = new HttpParams();
    
    /*if(searchTerm !== undefined)
    {
      searchTerm.
    }*/

    // TODO: Implement http params

    return this.apiService.MakeSecureGetRequest<Team[]>('v1/teams').pipe(map(x => x.body));
  }

  public getById(id: string) {
    return this.apiService.MakeSecureGetRequest<Team>('v1/teams/' + id).pipe(map(x => x.body));
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