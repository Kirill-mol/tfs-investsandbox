import { ChartSizeEnum } from './../../../../shared/models/chartSize.model';
import { QuoteTypeEnum } from './../../../../shared/models/quoteType.model';
import { Quote } from './../../../../shared/models/quote.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-quotes',
  templateUrl: './portfolio-quotes.component.html',
  styleUrls: ['./portfolio-quotes.component.less']
})
export class PortfolioQuotesComponent {
  @Input()
  quotes!: Quote[];

  readonly quoteType = QuoteTypeEnum;

  readonly chartSizes = ChartSizeEnum;
}
