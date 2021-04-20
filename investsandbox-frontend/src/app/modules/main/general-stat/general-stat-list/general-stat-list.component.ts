import { TopOfIncome } from './../../../../../shared/models/topOfIncome.model';
import { Range } from '../../../../../shared/models/range.model';
import {
  IStatistic,
  IStatisticToken,
} from '../../../../../shared/interfaces/IStatistic';
import { Currency } from '../../../../../shared/models/currency.model';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-general-stat-list',
  templateUrl: 'general-stat-list.component.html',
  styleUrls: ['general-stat-list.component.less'],
})
export class GeneralStatListComponent {
  @Input()
  incomeType: 'percent' | 'absolute' = 'percent';

  @Input()
  currency: Currency = 'RUB';

  @Input()
  range: Range = 'month';

  topOfIncomes!: TopOfIncome;

  constructor(@Inject(IStatisticToken) private statisticService: IStatistic) {
    this.topOfIncomes = statisticService.topPortfoliosOfIncome;
  }
}
