import { Observable } from 'rxjs';
import { Range } from './../models/range.model';
import { Currency } from './../models/currency.model';
import { Quote } from './../models/quote.model';
import { InjectionToken } from '@angular/core';

export const IYahooToken = new InjectionToken('IYahoo');

export interface IYahoo {
  searchQuotes(search: string): Observable<ReadonlyArray<Quote> | null>;

  getQuotePrice(quote: Quote, currency?: Currency): number;

  getHistoryOfQuotePrice(quoteSymbol: string, range?: Range): number[];

  convertCurrencies(value: number, from: Currency, to: Currency): number;
}