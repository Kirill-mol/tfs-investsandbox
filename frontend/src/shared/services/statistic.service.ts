import { CurrencyEnum } from './../models/currency.model';
import { IForex, IForexToken } from './../interfaces/IForex';
import { TopOfIncomeItem } from './../models/topOfIncome.model';
import { Range, RangeEnum } from './../models/range.model';
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
    @Inject(IForexToken) private forex: IForex
  ) {}

  private getTopPortfoliosOfPercentIncome(portfolios: Portfolio[], range: Range) {
    const top: TopOfIncomeItem[] = [];

    portfolios.forEach((portfolio) => {
      let income: number;

      if (range === RangeEnum.MONTH) {
        income = portfolio.income.percent.onMonth;
      } else {
        income = portfolio.income.percent.onAlltime;
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

  private getTopPortfoliosOfAbsoluteIncome(portfolios: Portfolio[]) {
    const top: TopOfIncomeItem[] = [];

    portfolios.forEach((portfolio) => {
      let income = portfolio.income.absolute;

      if (income > 0) {
        top.push({
          portfolioTitle: portfolio.title,
          incomeValue: this.forex.convertCurrencies(portfolio.currency, CurrencyEnum.RUB, income)
        });
      }
    });

    return top.sort((a, b) => b.incomeValue - a.incomeValue);
  }

  updateTopPortfoliosOfIncome(portfolios: Portfolio[]) {
    this._topPortfoliosOfIncome = {
      absolute: this.getTopPortfoliosOfAbsoluteIncome(portfolios),
      percent: {
        onAllTime: this.getTopPortfoliosOfPercentIncome(portfolios, RangeEnum.ALL),
        onMonth: this.getTopPortfoliosOfPercentIncome(portfolios, RangeEnum.MONTH)
      }
    }
  }
}
