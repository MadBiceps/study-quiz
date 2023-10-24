import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public searchTerm = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  get displayNav() {
    return this.authService.isLoggedIn();
  }

  onSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        search: this.searchTerm
      }
    });
  }
}
