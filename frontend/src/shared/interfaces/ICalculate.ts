import { InjectionToken } from '@angular/core';
import { Portfolio } from '../models/portfolio.model';
import { Range } from '../models/range.model';

export const ICalculateToken = new InjectionToken('ICalculate');

export interface ICalculate {
  round(num: number): number;

  calcRealBalance(portfolio: Portfolio): number;

  calcPercentIncome(portfolio: Portfolio, range: Range): number;

  calcAbsoluteIncome(portfolio: Portfolio): number;

}