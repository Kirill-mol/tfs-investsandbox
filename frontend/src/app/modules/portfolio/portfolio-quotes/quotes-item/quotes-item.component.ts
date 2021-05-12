import { Portfolio } from 'src/shared/models/portfolio.model';
import { Component, Input } from '@angular/core';
import { SizeEnum } from 'src/shared/models/size.model';
import { Quote } from 'src/shared/models/quote.model';
import { QuoteTypeEnum } from 'src/shared/models/quoteType.model';

@Component({
  selector: 'app-quotes-item',
  templateUrl: './quotes-item.component.html',
  styleUrls: ['./quotes-item.component.less']
})
export class QuotesItemComponent {
  readonly quoteType = QuoteTypeEnum;
  readonly chartSizes = SizeEnum;
  readonly isMobile = window.innerWidth <= 430;

  @Input()
  quote!: Quote;

  @Input()
  portfolio!: Portfolio;
}
