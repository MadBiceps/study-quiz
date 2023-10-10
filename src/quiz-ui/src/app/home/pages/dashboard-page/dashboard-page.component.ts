import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {

  constructor(private router: Router) {}

  public goToQuiz() {
    this.router.navigate(['/quizzes']);
  }

  public goToTeam() {
    this.router.navigate(['/teams']);
  }

}
