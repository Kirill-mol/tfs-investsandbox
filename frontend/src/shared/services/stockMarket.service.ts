import { Translit } from './../models/translit.model';
import { Currency, CurrencyEnum } from './../models/currency.model';
import { StorageService } from './storage.service';
import { QuoteTypeEnum } from '../models/quoteType.model';
import { ExchangeEnum } from '../models/exchange.model';
import {
  IStockMarketApi,
  IStockMarketApiToken,
} from '../interfaces/IStockMarketApi';
import { IStockMarket } from '../interfaces/IStockMarket';
import { Inject, Injectable } from '@angular/core';
import { Quote } from '../models/quote.model';
import { map, switchMap, filter, tap, mergeMap, concatMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StockMarketService implements IStockMarket {
  constructor(
    @Inject(IStockMarketApiToken)
    private stockMarketApiService: IStockMarketApi,
    private storage: StorageService
  ) {}

  private validQuote(quote: any, portfolioCurrency: Currency) {
    const exchange = quote.exchange;
    const type = quote.quoteType;
    const symbol: string = quote.symbol;

    if (
      type === QuoteTypeEnum.CURRENCY &&
      symbol.slice(3, 6) !== portfolioCurrency
    ) {
      return false;
    }

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
      shortname: quote.shortName,
      exchange: quote.exchange,
      quoteType: quote.quoteType,
      symbol: quote.symbol,
      currency: quote.currency,
      price: quote.regularMarketPrice.raw,
      quantity: 0,
      history: [],
    };
  }

  private getCache(): { [search: string]: string[] } {
    let cache = this.storage.getItem('cache');

    if (!cache) {
      cache = {};
      this.storage.setItem('cache', cache);
    }
    return cache;
  }

  private getSearchCache(search: string): string[] | null {
    const cache = this.getCache();

    return cache[search] ? cache[search] : null;
  }

  private setSearchCache(search: string, values: string[]) {
    const cache = this.getCache();

    cache[search] = values;
    this.storage.setItem('cache', cache)
  }

  private transliterateToEnglish(string: string) {
    let newString = '';

    for(let i = 0; i < string.length; i++) {
      if (Translit[string[i]]) {
        newString += Translit[string[i]];
      } else {
        newString += string[i];
      }
    }

    return newString;
  }

  searchQuotes(search: string, portfolioCurrency: Currency) {
    const translitedSearch = this.transliterateToEnglish(search);
    const searchCache = this.getSearchCache(translitedSearch);

    if (searchCache) {
      return this.getQuotesBySymbols(searchCache).pipe(mergeMap(quotes => this.getQuotesWithHistory(quotes)));
    }

    return this.stockMarketApiService.searchQuotes(translitedSearch).pipe(
      filter((res) => res != null),
      map((quotes) =>
        quotes.reduce((res: string[], quote: any) => {
          if (this.validQuote(quote, portfolioCurrency)) {
            res.push(quote.symbol);
          }
          return res;
        }, [])
      ),
      filter((symbols) => symbols.length > 0),
      tap((symbols) => {
        this.setSearchCache(search, symbols);
      }),
      switchMap((symbols) => this.getQuotesBySymbols(symbols)),
      mergeMap((quotes) => this.getQuotesWithHistory(quotes))
    );
  }

  getQuotesBySymbols(symbols: string[]) {
    if (symbols.length) {
      return forkJoin(symbols.map(symbol => this.stockMarketApiService.getQuoteBySimbol(symbol))).pipe(
        filter((quotes) => quotes && quotes.length > 0),
        map((quotes) => quotes.map((quote) => this.parseQuote(quote)))
      );
    }
    return of([]);
  }

  getQuotesWithHistory(quotes: Quote[]) {
    if (quotes.length) {
      return forkJoin(
        quotes.map((quote) => this.stockMarketApiService.getQuoteHistory(quote))
      ).pipe(
        map((histories) =>
          quotes.map((quote, index) => {
            quote.history = histories[index].filter(num => num != null);
            return quote;
          })
        )
      );
    }
    return of([]);
  }

  getQuotesPrice(quotes: Quote[]) {
    if (quotes.length) {
      const symbols = quotes.map((quote) => quote.symbol);

      return forkJoin(symbols.map(symbol => this.stockMarketApiService.getQuoteBySimbol(symbol)))
        .pipe(
          map((quotes) => quotes.map((quote): number => quote.regularMarketPrice.raw))
        );
    }
    return of([]);
  }
}
