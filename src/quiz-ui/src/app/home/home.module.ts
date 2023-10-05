import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { RouterModule, Routes } from '@angular/router';
import { QuizScoreCardComponent } from './components/quiz-score-card/quiz-score-card.component';

const routes: Routes = [{
  path: '',
  component: DashboardPageComponent
}];

@NgModule({
  declarations: [
    DashboardPageComponent,
    QuizScoreCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
