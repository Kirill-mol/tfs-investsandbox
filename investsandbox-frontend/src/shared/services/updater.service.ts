import { Quote } from './../models/quote.model';
import { IYahooApi, IYahooApiToken } from './../interfaces/IYahooApi';
import { IStatistic, IStatisticToken } from './../interfaces/IStatistic';
import { IBackendApi, IBackendApiToken } from './../interfaces/IBackendApi';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UpdaterService {
  constructor(
    @Inject(IBackendApiToken) private backendService: IBackendApi,
    @Inject(IStatisticToken) private statisticService: IStatistic,
    @Inject(IYahooApiToken) private yahooService: IYahooApi
  ) {}

  private updateIteration() {
    this.backendService.portfolios.forEach((portfolio) => {
      portfolio.realBalance = this.statisticService.calcRealBalance(portfolio);
      portfolio.income = {
        percent: {
          onMonth: this.statisticService.calcPercentIncome(portfolio, 'month'),
          onAlltime: this.statisticService.calcPercentIncome(portfolio, 'all'),
        },
        absolute: this.statisticService.calcAbsoluteIncome(portfolio),
      }
    });
    this.statisticService.topPortfoliosOfIncome.percent = {
      onAllTime: this.statisticService.getTopPortfoliosOfPercentIncome('all'),
      onMonth: this.statisticService.getTopPortfoliosOfPercentIncome('month'),
    };
    this.statisticService.topPortfoliosOfIncome.absolute = this.statisticService.getTopPortfoliosOfAbsoluteIncome();
  } 

  private updateQuotesIteration(quotes: Quote[]) {
    quotes.forEach(quote => {
      quote.price = this.yahooService.getPrice(quote);
      quote.history = {
        onMonth: this.yahooService.getHistoryOfPrice(quote.symbol),
        onAllTime: this.yahooService.getHistoryOfPrice(quote.symbol, 'all')
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
