import { IYahooApi, IYahooApiToken } from './../interfaces/IYahooApi';
import { IBackendApi, IBackendApiToken } from './../interfaces/IBackendApi';
import { TopOfIncomeItem } from './../models/topOfIncome.model';
import { Range } from './../models/range.model';
import { Portfolio } from './../models/portfolio.model';
import { IStatistic } from './../interfaces/IStatistic';
import { Inject, Injectable } from '@angular/core';
import { TopOfIncome } from '../models/topOfIncome.model';

@Injectable({ providedIn: 'root' })
export class StatisticService implements IStatistic {
  private _topPortfoliosOfIncome: TopOfIncome = {
    percent: {
      onMonth: [],
      onAllTime: [],
    },
    absolute: [],
  };

  get topPortfoliosOfIncome() {
    return this._topPortfoliosOfIncome;
  }

  constructor(
    @Inject(IBackendApiToken) private backendService: IBackendApi,
    @Inject(IYahooApiToken) private yahooService: IYahooApi
  ) {}

  round(num: number) {
    return Math.round(num * 100) / 100;
  }

  calcRealBalance(portfolio: Portfolio) {
    return this.round(
      portfolio.balance +
        portfolio.quotes.reduce((prev, quote) => {
          return (
            prev +
            quote.count * this.yahooService.getPrice(quote, portfolio.currency)
          );
        }, 0)
    );
  }

  calcPercentIncome(portfolio: Portfolio, range: Range) {
    const realBalance =
      portfolio.realBalance || this.calcRealBalance(portfolio);

    if (range === 'month') {
      if (portfolio.history.onMonth.length) {
        return this.round(
          (realBalance / portfolio.history.onMonth[0] - 1) * 100
        );
      } else {
        return 0;
      }
    }
    return this.round((realBalance / portfolio.initBalance - 1) * 100);
  }

  calcAbsoluteIncome(portfolio: Portfolio) {
    return (portfolio.realBalance || this.calcRealBalance(portfolio)) - portfolio.initBalance;
  }

  getTopPortfoliosOfPercentIncome(range: Range) {
    const top: TopOfIncomeItem[] = [];
    const portfolios: Portfolio[] = this.backendService.portfolios;

    portfolios.forEach((portfolio) => {
      let income: number;

      if (range === 'month') {
        income =
          portfolio.income?.percent?.onMonth ||
          this.calcPercentIncome(portfolio, range);
      } else {
        income =
          portfolio.income?.percent?.onAlltime ||
          this.calcPercentIncome(portfolio, range);
      }

      if (income > 0) {
        top.push({
          portfolioTitle: portfolio.title,
          incomeValue: income,
        });
      }
    });

    return top.sort((a, b) => b.incomeValue - a.incomeValue);
  }

  getTopPortfoliosOfAbsoluteIncome() {
    const top: TopOfIncomeItem[] = [];
    const portfolios: Portfolio[] = this.backendService.portfolios;

    portfolios.forEach((portfolio) => {
      let income =
        portfolio.income?.absolute || this.calcAbsoluteIncome(portfolio);

      if (income > 0) {
        top.push({
          portfolioTitle: portfolio.title,
          incomeValue: portfolio.currency !== 'RUB' ? this.yahooService.convertCurrencies(income, portfolio.currency, 'RUB') : income,
        });
      }
    });

    return top.sort((a, b) => b.incomeValue - a.incomeValue);
  }
}
