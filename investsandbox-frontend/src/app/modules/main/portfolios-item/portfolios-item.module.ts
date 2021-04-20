import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiIslandModule } from '@taiga-ui/kit';
import { SharedModule } from './../../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';

import { PortfoliosItemComponent } from './portfolios-item.component';

@NgModule({
  imports: [SharedModule, TuiIslandModule, TuiMoneyModule],
  exports: [PortfoliosItemComponent],
  declarations: [PortfoliosItemComponent],
  providers: [],
})
export class PortfoliosItemModule { }

