import { CanActivateFn } from '@angular/router';
import { AuthToken } from '../models/token.model';

export const loggedInGuard: CanActivateFn = (route, state) => {
  var tokenString = localStorage.getItem('token');
  if (tokenString === null) {
    return false;
  }

  var token = JSON.parse(tokenString) as AuthToken;
  if (token.expiration < new Date()) {
    return false;
  }
  return true;
};
