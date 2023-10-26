import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../core/models/user.model';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apiService: ApiService
  ) { }

  getCurrentUserInfo() {
    return this.apiService.MakeSecureGetRequest<User>('v1/users/current').pipe(map(x => x.body));
  }
}
