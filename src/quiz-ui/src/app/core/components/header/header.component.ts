import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public searchTerm = '';

  constructor(
    private router: Router
  ) {}

  onSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        search: this.searchTerm
      }
    });
  }
}
