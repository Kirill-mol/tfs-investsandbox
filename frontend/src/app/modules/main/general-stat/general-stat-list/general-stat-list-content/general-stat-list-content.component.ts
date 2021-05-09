import {
  IncomeType,
  IncomeTypeEnum,
} from './../../../../../../shared/models/incomeType.model';
import {
  Currency,
  CurrencyEnum,
} from '../../../../../../shared/models/currency.model';
import { TopOfIncomeItem } from '../../../../../../shared/models/topOfIncome.model';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-stat-list-content',
  templateUrl: 'general-stat-list-content.component.html',
  styleUrls: ['general-stat-list-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralStatListContentComponent {
  @Input()
  item!: TopOfIncomeItem;

  @Input()
  incomeType: IncomeType = IncomeTypeEnum.PERCENT;

  @Input()
  currency: Currency = CurrencyEnum.RUB;

  readonly incomeTypes = IncomeTypeEnum;

  readonly currencies = CurrencyEnum;
}
