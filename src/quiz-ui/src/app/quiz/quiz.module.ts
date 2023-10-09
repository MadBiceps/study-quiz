import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizListPageComponent } from './pages/quiz-list-page/quiz-list-page.component';
import { QuizDetailPageComponent } from './pages/quiz-detail-page/quiz-detail-page.component';
import { Route, RouterModule } from '@angular/router';
import { QuizListComponent } from './component/quiz-list/quiz-list.component';
import { ClarityModule, ClrSpinnerModule } from '@clr/angular';
import { QuestionListComponent } from './component/question-list/question-list.component';
import { QuizAttempListComponent } from './component/quiz-attemp-list/quiz-attemp-list.component';
import { RunQuizPageComponent } from './pages/run-quiz-page/run-quiz-page.component';
import { QuizTimeLineComponent } from './component/quiz-time-line/quiz-time-line.component';

const routes: Route[] = [{
  path: '',
  pathMatch: 'full',
  component: QuizListPageComponent
}, {
  path: ':id',
  children: [{
    path: '',
    component: QuizDetailPageComponent,
  },
  {
    path: 'attempt/:attemptId',
    component: RunQuizPageComponent
  }]
}];

@NgModule({
  declarations: [
    QuizListPageComponent,
    QuizDetailPageComponent,
    QuizListComponent,
    QuestionListComponent,
    QuizAttempListComponent,
    RunQuizPageComponent,
    QuizTimeLineComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ClarityModule,
    ClrSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizModule { }
