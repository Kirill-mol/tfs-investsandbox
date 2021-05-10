import { ErrorTypeEnum } from 'src/shared/models/errorType.model';
import { EventTypeEnum } from '../../../shared/models/eventType.model';
import { IForex, IForexToken } from './../../../shared/interfaces/IForex';
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
  private _title = this.route.snapshot.paramMap.get('title');

  private _id = -1;

  private _backendEventDetector!: Subscription;

  private _updaterEventDetector!: Subscription;

  readonly ranges = RangeEnum;

  portfolio!: Portfolio;

  constructor(
    private updater: UpdaterService,
    private route: ActivatedRoute,
    private navigator: NavigationService,
    private cd: ChangeDetectorRef,
    @Inject(IBackendToken) private backendService: IBackend,
  ) {}

  ngOnInit() {
    if (this._title) {
      this.backendService.initFromPortfolio(this._title);

      this._backendEventDetector = this.backendService.eventDetector.subscribe(
        (msg) => {
          if (msg === EventTypeEnum.ACCOUNT_LOADED) {
            this._id = this._title
              ? this.backendService.getPortfolioIdByTitle(this._title)
              : -1;

            if (this._id !== -1) {
              this.portfolio = this.backendService.portfolios[this._id];
              this.updater.startPortfolioUpdater(this._id);
              this.cd.markForCheck();
            } else {
              this.navigator.toMain();
            }
          } else if (msg === EventTypeEnum.PORTFOLIO_DELETED) {
            this.navigator.toMain();
          } else {
            this.portfolio = this.backendService.portfolios[this._id];
            this.cd.markForCheck();
          }
        }
      );

      this._updaterEventDetector = this.updater.eventDetector.subscribe(() => {
        this.portfolio = this.backendService.portfolios[this._id];
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
