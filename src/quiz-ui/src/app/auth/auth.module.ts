import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';

const routes: Routes = [{
  path: 'login',
  pathMatch: 'full',
  component: LoginPageComponent
}, {
  path: 'register',
  pathMatch: 'full',
  component: RegisterPageComponent
}, {
  path: 'profile',
  pathMatch: 'full',
  component: UserPageComponent
}, {
  path: 'logout',
  pathMatch: 'full',
  component: LogoutPageComponent
}];

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    UserPageComponent,
    LogoutPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ClarityModule,
    FormsModule
  ]
})
export class AuthModule { }
