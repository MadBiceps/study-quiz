import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    ClarityModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
