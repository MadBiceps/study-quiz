import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { CoreModule } from './core/core.module';
import { ClarityIcons, userIcon, homeIcon, pencilIcon, talkBubblesIcon, trashIcon, angleIcon } from '@cds/core/icon';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

ClarityIcons.addIcons(userIcon, homeIcon, pencilIcon, talkBubblesIcon, trashIcon, angleIcon);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
