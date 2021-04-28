import { Portfolio } from './../models/portfolio.model';
import { IForex, IForexToken } from './../interfaces/IForex';
import { ICalculate, ICalculateToken } from './../interfaces/ICalculate';
import { switchMap, tap, mergeMap } from 'rxjs/operators';
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

  readonly subj = new Subject();

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

  startMainUpdater(ms = 10000) {
    this.cancelMainUpdater();
    this._mainUpdater = interval(ms)
      .pipe(
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
                  price: quote2.price,
                  history: quote2.history,
                };
              }
            );
          });
          this.updateIteration();
          this.statisticService.updateTopPortfoliosOfIncome(
            this.backendService.portfolios
          );
          console.log(this.backendService.account.portfolios[0]);
        })
      )
      .subscribe(this.subj);
  }

  cancelMainUpdater() {
    if (this._mainUpdater) {
      this._mainUpdater.unsubscribe();
    }
  }

  startPortfolioUpdater(portfolioId: number, ms = 10000) {
    this.cancelPortfolioUpdater();
    this._portfolioUpdater = interval(ms)
    .pipe(
      switchMap(() => this.forex.updateForex()),
      mergeMap(() =>
        this.stockMarketService.getQuotesBySymbols(
          this.backendService.quotesSymbols
        )
      ),
      mergeMap((quotes) => this.stockMarketService.getQuotesWithHistory(quotes)),
      tap((quotes) => {
        this.backendService.portfolios[portfolioId].quotes = this.backendService.portfolios[portfolioId].quotes.map((quote, index) => {
          quote = {
            ...quote,
            price: quotes[index].price,
            history: quotes[index].history
          }
          return quote;
        })
        this.updatePortfolio(this.backendService.portfolios[portfolioId]);
        console.log(this.backendService.account.portfolios[portfolioId]);
      })
    )
    .subscribe(this.subj);
  }

  cancelPortfolioUpdater() {
    if (this._portfolioUpdater) {
      this._portfolioUpdater.unsubscribe();
    }
  }
}
