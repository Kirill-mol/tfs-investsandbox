import { Currency } from './../models/currency.model';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';
import { InjectionToken } from '@angular/core';

export const IStockMarketToken = new InjectionToken('IStockMarket');

export interface IStockMarket {
  searchQuotes(search: string, portfolioCurrency: Currency): Observable<ReadonlyArray<Quote> | null>;

  getQuotesBySymbols(symbols: string[]): Observable<Quote[]>;

  getQuotesWithHistory(quotes: Quote[]): Observable<Quote[]>;

  getQuotesPrice(quotes: Quote[]): Observable<number[]>;
}