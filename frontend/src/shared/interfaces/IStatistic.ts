import { Portfolio } from 'src/shared/models/portfolio.model';
import { TopOfIncome, TopOfIncomeItem } from './../models/topOfIncome.model';
import { Range } from './../models/range.model';
import { InjectionToken } from '@angular/core';

export const IStatisticToken = new InjectionToken('IStatistic');

export interface IStatistic {

  topPortfoliosOfIncome: TopOfIncome;

  updateTopPortfoliosOfIncome(portfolios: Portfolio[]): void;
}