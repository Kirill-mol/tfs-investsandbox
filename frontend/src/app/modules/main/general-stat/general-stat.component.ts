import { IncomeTypeEnum } from './../../../../shared/models/incomeType.model';
import { RangeEnum } from './../../../../shared/models/range.model';
import { CurrencyEnum } from './../../../../shared/models/currency.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStatistic, IStatisticToken } from 'src/shared/interfaces/IStatistic';
import { TopOfIncome } from 'src/shared/models/topOfIncome.model';
import { UpdaterService } from 'src/shared/services/updater.service';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';

@Component({
  selector: 'app-general-stat',
  templateUrl: 'general-stat.component.html',
  styleUrls: ['general-stat.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralStatComponent {
  private updating!: Subscription;

  private backendChangeDetector!: Subscription;

  readonly incomeTypes = IncomeTypeEnum;

  formCurrency = new FormGroup({
    currency: new FormControl(CurrencyEnum.RUB),
  });

  formTimeRange = new FormGroup({
    range: new FormControl(RangeEnum.MONTH),
  });

  topOfIncomes!: TopOfIncome;

  get range() {
    return this.formTimeRange.get('range');
  }

  constructor(
    @Inject(IStatisticToken) private statisticService: IStatistic,
    @Inject(IBackendToken) private backendService: IBackend,
    private updater: UpdaterService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.backendChangeDetector = this.backendService.changeDetector.subscribe(
      () => {
        this.topOfIncomes = this.statisticService.topPortfoliosOfIncome;
        this.cd.markForCheck();
      }
    );
    this.updating = this.updater.subj.subscribe(() => {
      this.topOfIncomes = this.statisticService.topPortfoliosOfIncome;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.backendChangeDetector.unsubscribe();
    this.updating.unsubscribe();
  }
}
