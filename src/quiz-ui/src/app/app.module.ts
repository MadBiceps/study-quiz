import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { CoreModule } from './core/core.module';
import { ClarityIcons, userIcon, homeIcon, pencilIcon, talkBubblesIcon, trashIcon } from '@cds/core/icon';

ClarityIcons.addIcons(userIcon, homeIcon, pencilIcon, talkBubblesIcon, trashIcon);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
