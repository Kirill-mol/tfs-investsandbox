import { Quote } from './../../../../shared/models/quote.model';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Portfolio } from 'src/shared/models/portfolio.model';

@Component({
  selector: 'app-portfolio-quotes',
  templateUrl: './portfolio-quotes.component.html',
  styleUrls: ['./portfolio-quotes.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioQuotesComponent {
  @Input()
  quotes!: Quote[];

  @Input()
  portfolio!: Portfolio;
}
