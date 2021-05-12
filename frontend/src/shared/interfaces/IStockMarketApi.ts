import { Observable } from 'rxjs';
import { Range } from '../models/range.model';
import { Currency } from '../models/currency.model';
import { Quote } from '../models/quote.model';
import { InjectionToken } from '@angular/core';

export const IStockMarketApiToken = new InjectionToken('IStockMarketApi');

export interface IStockMarketApi {
  searchQuotes(search: string): Observable<any[]>;

  getQuoteBySimbol(symbol: string): Observable<any>;

  getQuoteHistory(quote: Quote): Observable<number[]>;

  getCurrencyRate(from: Currency, to: Currency): Observable<number>;
}