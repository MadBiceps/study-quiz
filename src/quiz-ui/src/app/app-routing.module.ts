import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
}, {
  path: 'auth',
  pathMatch: 'prefix',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
}, {
  path: 'quiz',
  pathMatch: 'prefix',
  loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
