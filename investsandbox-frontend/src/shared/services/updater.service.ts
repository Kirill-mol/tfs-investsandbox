import { RangeEnum } from './../models/range.model';
import { Quote } from './../models/quote.model';
import { IYahooApi, IYahooApiToken } from './../interfaces/IYahooApi';
import { IStatistic, IStatisticToken } from './../interfaces/IStatistic';
import { Inject, Injectable } from '@angular/core';
import { IBackend, IBackendToken } from '../interfaces/IBackend';

@Injectable({ providedIn: 'root' })
export class UpdaterService {
  constructor(
    @Inject(IBackendToken) private backendService: IBackend,
    @Inject(IStatisticToken) private statisticService: IStatistic,
    @Inject(IYahooApiToken) private yahooService: IYahooApi
  ) {}

  private updateIteration() {
    this.backendService.portfolios?.forEach((portfolio) => {
      portfolio.realBalance = this.statisticService.calcRealBalance(portfolio);
      portfolio.income = {
        percent: {
          onMonth: this.statisticService.calcPercentIncome(portfolio, RangeEnum.MONTH),
          onAlltime: this.statisticService.calcPercentIncome(portfolio, RangeEnum.ALL),
        },
        absolute: this.statisticService.calcAbsoluteIncome(portfolio),
      }
    });
    this.statisticService.topPortfoliosOfIncome.percent = {
      onAllTime: this.statisticService.getTopPortfoliosOfPercentIncome(RangeEnum.ALL),
      onMonth: this.statisticService.getTopPortfoliosOfPercentIncome(RangeEnum.MONTH),
    };
    this.statisticService.topPortfoliosOfIncome.absolute = this.statisticService.getTopPortfoliosOfAbsoluteIncome();
  } 

  private updateQuotesIteration(quotes: Quote[]) {
    quotes.forEach(quote => {
      quote.price = this.yahooService.getPrice(quote);
      quote.history = {
        onMonth: this.yahooService.getHistoryOfPrice(quote.symbol),
        onAllTime: this.yahooService.getHistoryOfPrice(quote.symbol, RangeEnum.ALL)
      };
    });
  }

  update(ms: number = 5000) {
    this.updateIteration();
    const updater = setInterval(() => {
      this.updateIteration();
    }, ms);
  }

  updateQuotes(quotes: Quote[], ms: number = 5000) {
    this.updateQuotesIteration(quotes);
    const updater = setInterval(() => {
      this.updateQuotesIteration(quotes);
    }, ms);
  }
}
