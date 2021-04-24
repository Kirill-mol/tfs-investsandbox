import { UrlEnum } from './../models/url.model';
import { IYahooApi } from './../interfaces/IYahooApi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../models/currency.model';
import { Quote } from '../models/quote.model';
import { Range } from '../models/range.model';
import { delay, startWith } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class YahooApiService implements IYahooApi {
  constructor(private httpClient: HttpClient) { }

  getQuotes(search: string) {
    return this.httpClient.get(`${UrlEnum.YAHOO_AUTOCOMPLETE}?q=${search}&region=US`).pipe(delay(500));
  }

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