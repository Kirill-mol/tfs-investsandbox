import { TopOfIncome, TopOfIncomeItem } from './../models/topOfIncome.model';
import { Currency } from './../models/currency.model';
import { Range } from './../models/range.model';
import { Portfolio } from './../models/portfolio.model';
import { InjectionToken } from '@angular/core';

export const IStatisticToken = new InjectionToken('IStatistic');

export interface IStatistic {

  topPortfoliosOfIncome: TopOfIncome;

  round(num: number): number;

  calcRealBalance(portfolio: Portfolio): number;

  calcPercentIncome(portfolio: Portfolio, range: Range): number;

  calcAbsoluteIncome(portfolio: Portfolio): number;

  getTopPortfoliosOfPercentIncome(range: Range): TopOfIncomeItem[];

  getTopPortfoliosOfAbsoluteIncome(): TopOfIncomeItem[];
}