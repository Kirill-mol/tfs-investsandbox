import { NotificationsService } from 'src/shared/services/notifications.service';
import { EventTypeEnum } from '../../../shared/models/eventType.model';
import { Subscription } from 'rxjs';
import { RangeEnum } from './../../../shared/models/range.model';
import { NavigationService } from './../../../shared/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { UpdaterService } from './../../../shared/services/updater.service';
import { Portfolio } from './../../../shared/models/portfolio.model';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';

@Component({
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['portfolio.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent implements OnInit, OnDestroy {
  private _titleParam = this.route.snapshot.paramMap.get('title');

  private _portfolioPos = -1;

  private _backendEventDetector!: Subscription;

  private _updaterEventDetector!: Subscription;

  readonly ranges = RangeEnum;

  readonly isMobile = window.innerWidth <= 430;

  portfolioLoaded = false;

  portfolio: Portfolio = {
    title: '######',
    initBalance: 123456,
    balance: 123456,
    realBalance: 123456,
    currency: 'RUB',
    income: {
      absolute: 123,
      percent: {
        onAlltime: 123,
        onMonth: 123,
      }
    },
    history: {
      onAllTime: [],
      onMonth: []
    },
    quotes: []
  };

  constructor(
    private updater: UpdaterService,
    private route: ActivatedRoute,
    private navigator: NavigationService,
    private notifications: NotificationsService,
    private cd: ChangeDetectorRef,
    @Inject(IBackendToken) private backendService: IBackend,
  ) {}

  ngOnInit() {
    if (this._titleParam) {
      this.backendService.initFromPortfolio(this._titleParam);

      this._backendEventDetector = this.backendService.eventDetector.subscribe(
        (type) => {
          if (type === EventTypeEnum.ACCOUNT_LOADED) {
            this._portfolioPos = this._titleParam
              ? this.backendService.getPortfolioIdByTitle(this._titleParam)
              : -1;

            if (this._portfolioPos !== -1) {
              this.portfolio = this.backendService.portfolios[this._portfolioPos];
              this.portfolioLoaded = true;
              this.updater.startPortfolioUpdater(this._portfolioPos);
              this.cd.markForCheck();
            } else {
              this.navigator.toMain();
            }
          } else if (type === EventTypeEnum.PORTFOLIO_DELETED) {
            this.navigator.toMain();
          } else if (type === EventTypeEnum.QUOTE_BOUGHT) {
            this.notifications.showSuccess('Акции успешно куплены');
            this.cd.markForCheck();
          } else if (type === EventTypeEnum.QUOTE_SOLD) {
            this.notifications.showSuccess('Акции успешно проданы');
            this.cd.markForCheck();
          }
        }
      );

      this._updaterEventDetector = this.updater.eventDetector.subscribe(() => {
        this.portfolio = this.backendService.portfolios[this._portfolioPos];
        this.cd.markForCheck();
      });
    } else {
      this.navigator.toMain();
    }
  }

  ngOnDestroy() {
    this._backendEventDetector.unsubscribe();
    this._updaterEventDetector.unsubscribe();
    this.updater.cancelPortfolioUpdater();
  }

  deletePortfolio() {
    this.backendService.deletePortfolio(this.portfolio.title);
  }
}
