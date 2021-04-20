import { PortfolioQuotesModule } from './portfolio-quotes/portfolio-quotes.module';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiIslandModule } from '@taiga-ui/kit';
import { SharedModule } from './../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';

import { PortfolioComponent } from './portfolio.component';

@NgModule({
  imports: [
    SharedModule,
    TuiIslandModule,
    TuiMoneyModule,
    PortfolioQuotesModule,
  ],
  exports: [PortfolioComponent],
  declarations: [PortfolioComponent],
  providers: [],
})
export class PortfolioModule {}
