import { QuotesItemModule } from './quotes-item/quotes-item.module';
import { QuotesSellModule } from './quotes-sell/quotes-sell.module';
import { QuotesBuyModule } from './quotes-buy/quotes-buy.module';
import { SharedModule } from './../../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { PortfolioQuotesComponent } from './portfolio-quotes.component';

@NgModule({
  imports: [
    SharedModule,
    QuotesItemModule,
    QuotesBuyModule,
    QuotesSellModule
  ],
  exports: [PortfolioQuotesComponent],
  declarations: [PortfolioQuotesComponent]
})
export class PortfolioQuotesModule {}
