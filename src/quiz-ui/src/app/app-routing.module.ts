import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [{
  path: '',
  canActivate: [ loggedInGuard ],
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
}, {
  path: 'auth',
  pathMatch: 'prefix',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
}, {
  path: 'quizzes',
  canActivate: [ loggedInGuard ],
  pathMatch: 'prefix',
  loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)
}, {
  path: 'teams',
  canActivate: [ loggedInGuard ],
  pathMatch: 'prefix',
  loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
}, {
  path: 'error',
  pathMatch: 'prefix',
  loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
}, {
  path: 'search',
  canActivate: [ loggedInGuard ],
  pathMatch: 'prefix',
  loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
}, {
  path: 'users',
  canActivate: [ loggedInGuard ],
  pathMatch: 'prefix',
  loadChildren: () => import('./user/user.module').then(m => m.UserModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
