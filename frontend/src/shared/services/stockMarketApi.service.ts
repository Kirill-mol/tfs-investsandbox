import { UrlEnum } from '../models/url.model';
import { IStockMarketApi } from '../interfaces/IStockMarketApi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../models/currency.model';
import { Quote } from '../models/quote.model';
import { Range } from '../models/range.model';
import { delay, map, startWith, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StockMarketApiService implements IStockMarketApi {
  constructor(private httpClient: HttpClient) {}

  searchQuotes(search: string) {
    return this.httpClient.get<any>(
      `${UrlEnum.YAHOO_AUTOCOMPLETE}?q=${search}&region=US`
    ).pipe(map(res => res.quotes), catchError(() => of(null)));
  }

  getQuoteBySimbol(symbol: string) {
    return this.httpClient.get<any>(
      `${UrlEnum.YAHOO_GET_QUOTE_INFO}/${symbol}?modules=price`
    ).pipe(map((quote) => quote.quoteSummary.result[0].price), catchError(() => of(null)));
  }

  getQuoteHistory(quote: Quote) {
    return this.httpClient
      .get<any>(
        `${UrlEnum.YAHOO_GET_QUOTE_HISTORY}/${quote.symbol}?interval=5d&range=1y`
      )
      .pipe(map((history) => history.chart.result[0].indicators.quote[0].close), catchError(() => of([])));
  }

  getCurrencyRate(from: Currency, to: Currency) {
    if (from !== to) {
      return this.getQuoteBySimbol(`${from}${to}=X`)
        .pipe(map((quote) => quote.regularMarketPrice.raw), catchError(() => of(1)));
    }
    return of(1);
  }
}
