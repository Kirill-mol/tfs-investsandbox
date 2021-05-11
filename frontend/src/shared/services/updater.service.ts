import { Portfolio } from './../models/portfolio.model';
import { IForex, IForexToken } from './../interfaces/IForex';
import { ICalculate, ICalculateToken } from './../interfaces/ICalculate';
import { switchMap, tap, mergeMap, filter } from 'rxjs/operators';
import { interval, Subscription, Subject } from 'rxjs';
import { IStockMarketToken } from 'src/shared/interfaces/IStockMarket';
import { IStockMarket } from './../interfaces/IStockMarket';
import { RangeEnum } from './../models/range.model';
import { IStatistic, IStatisticToken } from './../interfaces/IStatistic';
import { Inject, Injectable } from '@angular/core';
import { IBackend, IBackendToken } from '../interfaces/IBackend';

@Injectable({ providedIn: 'root' })
export class UpdaterService {
  private _mainUpdater!: Subscription;

  private _portfolioUpdater!: Subscription;

  readonly eventDetector = new Subject();

  constructor(
    @Inject(IBackendToken) private backendService: IBackend,
    @Inject(ICalculateToken) private calculator: ICalculate,
    @Inject(IStatisticToken) private statisticService: IStatistic,
    @Inject(IStockMarketToken) private stockMarketService: IStockMarket,
    @Inject(IForexToken) private forex: IForex
  ) {}

  private updatePortfolio(portfolio: Portfolio): Portfolio {
    portfolio.realBalance = this.calculator.calcRealBalance(portfolio);
    portfolio.income = {
      percent: {
        onMonth: this.calculator.calcPercentIncome(portfolio, RangeEnum.MONTH),
        onAlltime: this.calculator.calcPercentIncome(portfolio, RangeEnum.ALL),
      },
      absolute: this.calculator.calcAbsoluteIncome(portfolio),
    };
    return portfolio;
  }

  private updateIteration() {
    this.backendService.account.portfolios = this.backendService.portfolios.map(
      (portfolio) => this.updatePortfolio(portfolio)
    );
  }

  private validTime(): boolean {
    const date = new Date();
    const h = (date.getUTCHours() + 3) % 24;
    const d = date.getUTCDay();

    return (h >= 10 || h === 0) && d > 0 && d < 6;
  }

  startMainUpdater(ms = 6000) {
    this.cancelMainUpdater();
    this._mainUpdater = interval(ms)
      .pipe(
        filter(() => this.validTime() && this.backendService.quotesSymbols.length > 0),
        switchMap(() => this.forex.updateForex()),
        mergeMap(() =>
          this.stockMarketService.getQuotesBySymbols(
            this.backendService.quotesSymbols
          )
        ),
        tap((quotes) => {
          this.backendService.portfolios.forEach((portfolio, index) => {
            this.backendService.portfolios[index].quotes = portfolio.quotes.map(
              (quote) => {
                const quote2 = quotes.filter(
                  (quote2) => quote2.symbol === quote.symbol
                )[0];

                return {
                  ...quote,
                  price: quote2.price
                };
              }
            );
          });
          this.updateIteration();
          this.statisticService.updateTopPortfoliosOfIncome(
            this.backendService.portfolios
          );
        })
      )
      .subscribe(this.eventDetector);
  }

  cancelMainUpdater() {
    if (this._mainUpdater) {
      this._mainUpdater.unsubscribe();
    }
  }

  startPortfolioUpdater(portfolioPos: number, ms = 6000) {
    this.cancelPortfolioUpdater();
    this._portfolioUpdater = interval(ms)
    .pipe(
      filter(() => this.validTime() && this.backendService.quotesSymbols.length > 0),
      switchMap(() => this.forex.updateForex()),
      mergeMap(() =>
        this.stockMarketService.getQuotesBySymbols(
          this.backendService.portfolios[portfolioPos].quotes.map(quote => quote.symbol)
        )
      ),
      tap((quotes) => {
        this.backendService.portfolios[portfolioPos].quotes = this.backendService.portfolios[portfolioPos].quotes.map((quote, index) => {
          quote = {
            ...quote,
            price: quotes[index].price,
          }
          return quote;
        })
        this.updatePortfolio(this.backendService.portfolios[portfolioPos]);
      })
    )
    .subscribe(this.eventDetector);
  }

  cancelPortfolioUpdater() {
    if (this._portfolioUpdater) {
      this._portfolioUpdater.unsubscribe();
    }
  }
}
