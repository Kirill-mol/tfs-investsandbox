import { PortfoliosListModule } from './portfolios-list/portfolios-list.module';
import { GeneralStatModule } from './general-stat/general-stat.module';
import { AccountModule } from './account/account.module';
import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';

@NgModule({
  imports: [AccountModule, GeneralStatModule, PortfoliosListModule],
  exports: [MainComponent],
  declarations: [MainComponent],
  providers: [],
})
export class MainModule { }
