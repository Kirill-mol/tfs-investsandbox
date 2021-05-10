import { IForex, IForexToken } from './../../../shared/interfaces/IForex';
import { Subscription } from 'rxjs';
import { RangeEnum } from './../../../shared/models/range.model';
import { NavigationService } from './../../../shared/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { UpdaterService } from './../../../shared/services/updater.service';
import { Portfolio } from './../../../shared/models/portfolio.model';
import { ChangeDetectionStrategy, Component, Inject, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';

@Component({
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['portfolio.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit, OnDestroy {
  private title = this.route.snapshot.paramMap.get('title');

  private id = -1;

  private backendChangeDetector!: Subscription;

  private updating!: Subscription;

  private forexSubscription!: Subscription;

  readonly ranges = RangeEnum;
  
  portfolio: Portfolio = {
    title: '',
    initBalance: 0,
    realBalance: 0,
    balance: 0,
    currency: 'RUB',
    history: {
      onMonth: [],
      onAllTime: []
    },
    quotes: [],
    income: {
      percent: {
        onMonth: 0,
        onAlltime: 0,
      },
      absolute: 0
    }
  };

  constructor(private updater: UpdaterService,
    private route: ActivatedRoute,
    private navigator: NavigationService,
    private cd: ChangeDetectorRef,
    @Inject(IBackendToken) private backendService: IBackend,
    @Inject(IForexToken) private forex: IForex,
  ) {}

  ngOnInit() {
    if (this.title) {
      this.backendService.initFromPortfolio(this.title);

      this.forexSubscription = this.forex.updateForex().subscribe(() => {}, (error) => {
        this.navigator.toMain();
      });

      this.backendChangeDetector = this.backendService.changeDetector.subscribe(() => {
        this.id = this.title ? this.backendService.getPortfolioIdByTitle(this.title) : -1;
    
        if (this.id !== -1) {
          this.portfolio = this.backendService.portfolios[this.id];
          this.updater.startPortfolioUpdater(this.id);
          this.cd.markForCheck();
        } else {
          this.navigator.toMain();
        }
      })

      this.updating = this.updater.subj.subscribe(() => {
        this.portfolio = this.backendService.portfolios[this.id];
        this.cd.markForCheck();
      });
    } else {
      this.navigator.toMain();
    }
  }

  ngOnDestroy() {
    this.backendChangeDetector.unsubscribe();
    this.updating.unsubscribe();
    this.forexSubscription.unsubscribe();
    this.updater.cancelPortfolioUpdater();
  }
}