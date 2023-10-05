import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'auth',
  pathMatch: 'prefix',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
}, {
  path: '',
  loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
