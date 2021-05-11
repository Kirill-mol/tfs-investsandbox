import { PortfolioQuotesModule } from './portfolio-quotes/portfolio-quotes.module';
import { SharedModule } from './../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';

import { PortfolioComponent } from './portfolio.component';

@NgModule({
  imports: [
    SharedModule,
    PortfolioQuotesModule,
  ],
  exports: [PortfolioComponent],
  declarations: [PortfolioComponent],
  providers: [],
})
export class PortfolioModule {}
