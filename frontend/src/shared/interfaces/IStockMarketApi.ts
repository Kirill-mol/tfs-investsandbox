import { Observable } from 'rxjs';
import { Range } from '../models/range.model';
import { Currency } from '../models/currency.model';
import { Quote } from '../models/quote.model';
import { InjectionToken } from '@angular/core';

export const IStockMarketApiToken = new InjectionToken('IStockMarketApi');

export interface IStockMarketApi {
  searchQuotes(search: string): Observable<any>;

  getQuotesBySimbols(symbols: string[]): Observable<any[]>;

  getQuoteHistory(quote: Quote): Observable<any>;

  getCurrencyRate(from: Currency, to: Currency): Observable<number>;
}