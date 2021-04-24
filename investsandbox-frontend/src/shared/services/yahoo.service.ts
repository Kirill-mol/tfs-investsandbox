import { QuoteType, QuoteTypeEnum } from './../models/quoteType.model';
import { Exchange, ExchangeEnum } from './../models/exchange.model';
import { CurrencyEnum } from './../models/currency.model';
import { IYahooApi, IYahooApiToken } from './../interfaces/IYahooApi';
import { IYahoo } from './../interfaces/IYahoo';
import { Inject, Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';
import { Quote } from '../models/quote.model';
import { Range } from '../models/range.model';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class YahooService implements IYahoo {
  constructor(@Inject(IYahooApiToken) private yahooApiService: IYahooApi) {}

  private checkQuote(quote: any) {
    const exchange = quote.exchange;
    const type = quote.quoteType;

    return (
      (exchange === ExchangeEnum.MCX ||
        exchange === ExchangeEnum.NMS ||
        exchange === ExchangeEnum.NYQ ||
        exchange === ExchangeEnum.CCY) &&
      (type === QuoteTypeEnum.CURRENCY ||
        type === QuoteTypeEnum.EQUITY ||
        type === QuoteTypeEnum.ETF)
    );
  }

  private parseQuote(quote: any): Quote {
    return {
      shortname: quote.shortname,
      exchange: quote.exchange,
      quoteType: quote.quoteType,
      symbol: quote.symbol,
      count: 0,
      currency: CurrencyEnum.RUB,
    };
  }

  searchQuotes(search: string): Observable<Quote[] | null> {
    return this.yahooApiService.getQuotes(search).pipe(
      map((res) => {
        return res.quotes.reduce((res: Quote[], element: any) => {
          if (this.checkQuote(element)) {
            res.push(this.parseQuote(element));
          }
          return res;
        }, []);
      })
    );
  }

  getQuotePrice(quote: Quote, currency?: Currency): number {
    throw new Error('Method not implemented.');
  }

  getHistoryOfQuotePrice(quoteSymbol: string, range?: Range): number[] {
    throw new Error('Method not implemented.');
  }

  convertCurrencies(value: number, from: Currency, to: Currency): number {
    throw new Error('Method not implemented.');
  }
}
