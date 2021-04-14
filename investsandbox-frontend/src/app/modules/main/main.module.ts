import { AccountModule } from './account/account.module';
import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';

@NgModule({
  imports: [AccountModule],
  exports: [MainComponent],
  declarations: [MainComponent],
  providers: [],
})
export class MainModule { }
