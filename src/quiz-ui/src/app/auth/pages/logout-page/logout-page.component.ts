import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
