import { SharedModule } from 'src/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { LandingComponent } from './landing.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [LandingComponent]
})
export class LandingModule { }
