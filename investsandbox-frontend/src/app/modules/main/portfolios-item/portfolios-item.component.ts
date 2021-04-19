import { Portfolio } from './../../../../shared/models/portfolio.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portfolios-item',
  templateUrl: 'portfolios-item.component.html',
  styleUrls: ['portfolios-item.component.less']
})

export class PortfoliosItemComponent {
  @Input()
  portfolio!: Portfolio;
}
