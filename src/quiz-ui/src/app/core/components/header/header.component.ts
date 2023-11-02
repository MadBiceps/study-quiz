import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchTerm = '';
  public username = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUserInfo().subscribe(resp => {
      if(resp != null)
        this.username = resp.username;
    });
  }

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
