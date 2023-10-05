import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: DashboardPageComponent
}];

@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
