import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizListPageComponent } from './pages/quiz-list-page/quiz-list-page.component';
import { QuizDetailPageComponent } from './pages/quiz-detail-page/quiz-detail-page.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [{
  path: '',
  pathMatch: 'full',
  component: QuizListPageComponent
}, {
  path: ':id',
  pathMatch: 'full',
  component: QuizDetailPageComponent
}];

@NgModule({
  declarations: [
    QuizListPageComponent,
    QuizDetailPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class QuizModule { }
