import { IYahooApi, IYahooApiToken } from './../interfaces/IYahooApi';
import { IYahoo } from './../interfaces/IYahoo';
import { Inject, Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';
import { Quote } from '../models/quote.model';
import { Range } from '../models/range.model';

@Injectable({providedIn: 'root'})
export class YahooService implements IYahoo {
  constructor(@Inject(IYahooApiToken) private yahooApiService: IYahooApi) { }

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