import { GeneralStatisticsModule } from './generalStatistics/generalStatistics.module';
import { AccountModule } from './account/account.module';
import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';

@NgModule({
  imports: [AccountModule, GeneralStatisticsModule],
  exports: [MainComponent],
  declarations: [MainComponent],
  providers: [],
})
export class MainModule { }
