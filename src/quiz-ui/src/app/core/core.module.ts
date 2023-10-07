import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ClarityModule } from '@clr/angular';
import { Route, RouterModule } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Route[] = [{
  path: 'search',
  pathMatch: 'full',
  component: SearchPageComponent
}];

@NgModule({
  declarations: [
    HeaderComponent,
    SearchPageComponent,
  ],
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
