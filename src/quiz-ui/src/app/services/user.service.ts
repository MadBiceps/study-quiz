import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../core/models/user.model';
import { BehaviorSubject, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apiService: ApiService
  ) {
    this.getCurrentUserInfo().subscribe(resp => {
      this.currentUserBS.next(resp);
    });
  }

  currentUserBS = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserBS.asObservable().pipe(shareReplay(1));

  getCurrentUserInfo() {
    return this.apiService.MakeSecureGetRequest<User>('v1/users/current').pipe(map(x => x.body));
  }

  onUserLogin() {
    this.getCurrentUserInfo().subscribe(resp => {
      this.currentUserBS.next(resp);
    });
  }

  onUserLogout() {
    this.currentUserBS.next(null);
  }

}
