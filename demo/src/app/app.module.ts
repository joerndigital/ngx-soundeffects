import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSoundDirective, NgxSoundeffectsModule } from 'ngx-soundeffects';

@NgModule({
  declarations: [
    AppComponent,
    NgxSoundDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
