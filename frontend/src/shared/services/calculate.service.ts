import { ForexService } from './forex.service';
import { IForexToken } from './../interfaces/IForex';
import { ICalculate } from './../interfaces/ICalculate';
import { Inject, Injectable } from '@angular/core';
import { Portfolio } from '../models/portfolio.model';
import { Range } from '../models/range.model';

@Injectable({providedIn: 'root'})
export class CalculateService implements ICalculate {
  constructor(@Inject(IForexToken) private forex: ForexService) {}

  round(num: number) {
    return Math.round(num * 100) / 100;
  }

  calcRealBalance(portfolio: Portfolio) {
    return this.round(
      portfolio.balance +
        portfolio.quotes.reduce((prev, quote) => {
          return (
            prev +
             this.forex.convertCurrencies(quote.currency, portfolio.currency, quote.quantity * quote.price)
          );
        }, 0)
    );
  }

  calcPercentIncome(portfolio: Portfolio, range: Range) {
    const realBalance = portfolio.realBalance;

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
    return portfolio.realBalance - portfolio.initBalance;
  }
  
}