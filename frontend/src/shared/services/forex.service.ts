import { CurrencyEnum } from './../models/currency.model';
import { forkJoin } from 'rxjs';
import {
  IStockMarketApi,
  IStockMarketApiToken,
} from './../interfaces/IStockMarketApi';
import { Inject, Injectable } from '@angular/core';
import { IForex } from '../interfaces/IForex';
import { Currency } from '../models/currency.model';
import { tap, mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ForexService implements IForex {
  private _forexQuotes: {[curr: string]: number} = {
    USDRUB: 1,
    USDEUR: 1,
    EURRUB: 1,
  };

  private _curr = CurrencyEnum;

  constructor(
    @Inject(IStockMarketApiToken) private forexApiService: IStockMarketApi
  ) {}

  convertCurrencies(from: Currency, to: Currency, value: number = 1): number {
    if (from !== to) {
      if (this._forexQuotes[`${from}${to}`]) {
        return this._forexQuotes[`${from}${to}`] * value;
      } 
      return 1 / this._forexQuotes[`${to}${from}`] * value;
    }
    return value;
  }

  updateForex() {
    return forkJoin([
      this.forexApiService.getCurrencyRate(this._curr.USD, this._curr.RUB),
      this.forexApiService.getCurrencyRate(this._curr.USD, this._curr.EUR),
      this.forexApiService.getCurrencyRate(this._curr.EUR, this._curr.RUB),
    ]).pipe(tap(values => {
      this._forexQuotes = {
        USDRUB: values[0],
        USDEUR: values[1],
        EURRUB: values[2]
      }
    }), mapTo(undefined));
  }
}
