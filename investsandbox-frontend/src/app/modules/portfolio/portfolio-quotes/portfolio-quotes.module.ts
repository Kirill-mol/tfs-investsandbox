import { QuotesSellModule } from './../../quotes-sell/quotes-sell.module';
import { QuotesBuyModule } from './../../quotes-buy/quotes-buy.module';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiIslandModule } from '@taiga-ui/kit';
import { SharedModule } from './../../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { PortfolioQuotesComponent } from './portfolio-quotes.component';

@NgModule({
  imports: [
    SharedModule,
    TuiIslandModule,
    TuiMoneyModule,
    QuotesBuyModule,
    QuotesSellModule
  ],
  exports: [PortfolioQuotesComponent],
  declarations: [PortfolioQuotesComponent]
})
export class PortfolioQuotesModule { }
