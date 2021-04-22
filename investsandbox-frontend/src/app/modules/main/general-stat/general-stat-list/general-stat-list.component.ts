import { IncomeType, IncomeTypeEnum } from './../../../../../shared/models/incomeType.model';
import { TopOfIncome } from './../../../../../shared/models/topOfIncome.model';
import { Range, RangeEnum} from '../../../../../shared/models/range.model';
import {
  IStatistic,
  IStatisticToken,
} from '../../../../../shared/interfaces/IStatistic';
import { Currency, CurrencyEnum } from '../../../../../shared/models/currency.model';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-general-stat-list',
  templateUrl: 'general-stat-list.component.html',
  styleUrls: ['general-stat-list.component.less'],
})
export class GeneralStatListComponent {
  @Input()
  incomeType: IncomeType = IncomeTypeEnum.PERCENT;

  @Input()
  currency: Currency = CurrencyEnum.RUB;

  @Input()
  range: Range = RangeEnum.MONTH;

  readonly incomeTypes = IncomeTypeEnum;

  readonly ranges = RangeEnum;

  topOfIncomes!: TopOfIncome;

  constructor(@Inject(IStatisticToken) private statisticService: IStatistic) {
    this.topOfIncomes = statisticService.topPortfoliosOfIncome;
  }
}
