import { Observable } from 'rxjs';
import { Range } from './../models/range.model';
import { Currency } from './../models/currency.model';
import { Quote } from './../models/quote.model';
import { InjectionToken } from '@angular/core';

export const IYahooApiToken = new InjectionToken('IYahooApi');

export interface IYahooApi {
  getQuotes(search: string): Observable<any>;

  getPrice(quote: Quote, currency?: Currency): number;

  getHistoryOfPrice(quoteSymbol: string, range?: Range): number[];

  convertCurrencies(value: number, from: Currency, to: Currency): number;
}