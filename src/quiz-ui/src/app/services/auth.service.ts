import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthToken } from '../models/token.model';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  public login(username: string, password: string) {
    return this.httpClient.post<AuthToken | Message>(environment.apiUrl + 'v1/authenticate/login', {
      username: username,
      password: password
    }).pipe(map(x => {
      if('token' in x) {
        x = x as AuthToken;
        this.token = x;
      }
      return x;
    }));
  }

  public register(username: string, mail: string, password: string) {
    return this.httpClient.post<Message>(environment.apiUrl + 'v1/authenticate/register', {
      username: username,
      mail: mail,
      password: password
    });
  }

  public get token(): string {
    var tokenString = localStorage.getItem("token");
    if(tokenString == null) {
      this.router.navigate(['/auth/login']);
      return '';
    }

    var token = JSON.parse(tokenString) as AuthToken;
    if(token.expiration < new Date()) {
      this.router.navigate(['/auth/login']);
      return '';
    }

    return token.token;
  }

  public set token(token: AuthToken) {
    localStorage.setItem("token", JSON.stringify(token));
  }
}
