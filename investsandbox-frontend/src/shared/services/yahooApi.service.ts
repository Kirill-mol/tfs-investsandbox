import { IYahooApi } from './../interfaces/IYahooApi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../models/currency.model';
import { Quote } from '../models/quote.model';
import { Range } from '../models/range.model';

@Injectable({providedIn: 'root'})
export class YahooApiService implements IYahooApi {
  constructor(private httpClient: HttpClient) { }

  getPrice(quote: Quote, currency?: Currency): number {
    throw new Error('Method not implemented.');
  }

  getHistoryOfPrice(quoteSymbol: string, range?: Range): number[] {
    throw new Error('Method not implemented.');
  }
  
  convertCurrencies(value: number, from: Currency, to: Currency): number {
    throw new Error('Method not implemented.');
  }
}