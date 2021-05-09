import { UrlEnum } from '../models/url.model';
import { IStockMarketApi } from '../interfaces/IStockMarketApi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../models/currency.model';
import { Quote } from '../models/quote.model';
import { Range } from '../models/range.model';
import { delay, map, startWith, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StockMarketApiService implements IStockMarketApi {
  constructor(private httpClient: HttpClient) {}

  searchQuotes(search: string) {
    return this.httpClient.get(
      `${UrlEnum.YAHOO_AUTOCOMPLETE}?q=${search}&region=US`
    );
  }

  getQuotesBySimbols(symbols: string[]) {
    const symbolsString = symbols.join(',');

    return this.httpClient.get<any[]>(
      `${UrlEnum.MBOUM_GET_QUOTE}/?symbol=${symbolsString}`
    );
  }

  getQuoteHistory(quote: Quote) {
    return this.httpClient
      .get<any>(
        `${UrlEnum.MBOUM_GET_HISTORY}/?symbol=${quote.symbol}&interval=1h&diffandsplits=true`
      )
      .pipe(map((history) => history.items));
  }

  getCurrencyRate(from: Currency, to: Currency) {
    if (from !== to) {
      return this.httpClient
        .get<any>(`${UrlEnum.MBOUM_GET_QUOTE}/?symbol=${from}${to}=X`)
        .pipe(map((quote) => quote[0].regularMarketPrice));
    }
    return of(1);
  }
}
