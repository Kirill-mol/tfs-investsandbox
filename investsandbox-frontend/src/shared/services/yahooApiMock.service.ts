import { Range } from './../models/range.model';
import { Currency } from './../models/currency.model';
import { Quote } from './../models/quote.model';
import { IYahooApi } from './../interfaces/IYahooApi';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class YahooApiMockService implements IYahooApi {
  getPrice(quote: Quote, currency?: Currency) {
    const testPrice = 50 + 10 * Math.random();

    return !currency || currency === quote.currency ? testPrice : this.convertCurrencies(testPrice, quote.currency, currency);
  }

  getHistoryOfPrice(quoteSymbol: string, range: Range = 'month'): number[] {
    const history = new Array(range === 'month' ? 30 : 55);

    for (let i = 0; i < history.length; i++) {
      history[i] = 300 * Math.random();
    }

    return history;
  }

  convertCurrencies(value: number, from: Currency, to: Currency) {
    switch (from) {
      case 'RUB':
        if (to === 'EUR') {
          return value * 0.012;
        } else if (to === 'USD') {
          return value * 0.016;
        };
        break;
      case 'EUR':
        if (to === 'RUB') {
          return value * 90.0;
        } else if (to === 'USD') {
          return value * 1.08;
        };
        break;
      case 'USD':
        if (to === 'RUB') {
          return value * 80.0;
        } else if (to === 'EUR') {
          return value * 0.978;
        }
    }
    return value;
  }
}