import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: 'login',
  pathMatch: 'full',
  component: LoginPageComponent
}, {
  path: 'register',
  pathMatch: 'full',
  component: RegisterPageComponent
}];

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ClarityModule,
    FormsModule
  ]
})
export class AuthModule { }
