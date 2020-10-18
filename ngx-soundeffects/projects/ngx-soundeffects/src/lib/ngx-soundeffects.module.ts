import { NgModule } from '@angular/core';
import { NgxSoundeffectsComponent } from './ngx-soundeffects.component';
import { NgxSoundDirective } from './directives/sound.directive';



@NgModule({
  declarations: [NgxSoundeffectsComponent, NgxSoundDirective],
  imports: [
  ],
  exports: [NgxSoundeffectsComponent ]
})
export class NgxSoundeffectsModule { }
