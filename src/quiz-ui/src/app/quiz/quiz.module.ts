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
import { AddQuizModalComponent } from './modals/add-quiz-modal/add-quiz-modal.component';
import { AddQuestionModalComponent } from './modals/add-question-modal/add-question-modal.component';
import { QuestionDetailModalComponent } from './modals/question-detail-modal/question-detail-modal.component';
import { EditQuestionModalComponent } from './modals/edit-question-modal/edit-question-modal.component';
import { DeleteQuestionModalComponent } from './modals/delete-question-modal/delete-question-modal.component';
import { UpdateQuizModalComponent } from './modals/update-quiz-modal/update-quiz-modal.component';
import { DeleteQuizModalComponent } from './modals/delete-quiz-modal/delete-quiz-modal.component';
import { FormsModule } from '@angular/forms';

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
    QuizTimeLineComponent,
    AddQuizModalComponent,
    AddQuestionModalComponent,
    QuestionDetailModalComponent,
    EditQuestionModalComponent,
    DeleteQuestionModalComponent,
    UpdateQuizModalComponent,
    DeleteQuizModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ClarityModule,
    ClrSpinnerModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizModule { }
