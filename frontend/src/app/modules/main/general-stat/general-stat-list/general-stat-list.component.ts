import { IncomeType, IncomeTypeEnum } from './../../../../../shared/models/incomeType.model';
import { TopOfIncomeItem } from './../../../../../shared/models/topOfIncome.model';
import {
  Currency,
  CurrencyEnum,
} from '../../../../../shared/models/currency.model';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-general-stat-list',
  templateUrl: 'general-stat-list.component.html',
  styleUrls: ['general-stat-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralStatListComponent {
  @Input()
  currency: Currency = CurrencyEnum.RUB;

  @Input()
  top: TopOfIncomeItem[] | undefined;

  @Input()
  incomeType: IncomeType = IncomeTypeEnum.PERCENT;
}
