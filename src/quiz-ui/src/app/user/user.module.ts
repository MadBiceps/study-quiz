import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [{
  path: ':username',
  pathMatch: 'full',
  component: UserDetailPageComponent
}];  

@NgModule({
  declarations: [
    UserDetailPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
