import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TeamMember } from '../team/models/team.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamUserService {

  constructor(
    private apiService: ApiService
  ) { }

  public get(teamId: string) {
    return this.apiService.MakeSecureGetRequest<TeamMember[]>('v1/teams/' + teamId + 'users').pipe(map(x => x.body));
  }

  public join(teamId: string) {
    return this.apiService.MakeSecurePostRequest<TeamMember[]>('v1/teams/' + teamId + 'users', null).pipe(map(x => x.body));
  }

  public remove(teamId: string, username: string) {
    return this.apiService.MakeSecureDeleteRequest<void>('v1/teams/' + teamId + '/users/' + username).pipe(map(x => x.body));
  }
}
