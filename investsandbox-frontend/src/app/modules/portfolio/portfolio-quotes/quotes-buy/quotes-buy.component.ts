import { IYahooToken } from 'src/shared/interfaces/IYahoo';
import { IYahoo } from './../../../../../shared/interfaces/IYahoo';
import { Quote } from '../../../../../shared/models/quote.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { filter, startWith, switchMap, delay } from 'rxjs/operators';
import { TuiStringHandler } from '@taiga-ui/cdk';

const mockData: Quote[] = [
  {
    shortname: 'abc',
    currency: 'EUR',
    symbol: 'ABC',
    exchange: 'CCY',
    quoteType: 'CURRENCY',
    count: 0
  },
  {
    shortname: 'abc',
    currency: 'EUR',
    symbol: 'ABC',
    exchange: 'CCY',
    quoteType: 'CURRENCY',
    count: 0
  },
  {
    shortname: 'abc',
    currency: 'EUR',
    symbol: 'ABC',
    exchange: 'CCY',
    quoteType: 'CURRENCY',
    count: 0
  },
]

@Component({
  selector: 'app-quotes-buy',
  templateUrl: './quotes-buy.component.html',
  styleUrls: ['./quotes-buy.component.less'],
})
export class QuotesBuyComponent {
  search$ = new Subject<string>();

  items$: Observable<ReadonlyArray<Quote> | null> = this.search$.pipe(
    delay(500),
    filter(value => value != ''),
    switchMap(search => of(mockData).pipe(delay(500))),
    startWith([])
  );

  form = new FormGroup({
    search: new FormControl(null, [Validators.required]),
    count: new FormControl(1, [Validators.min(1), Validators.required])
  });

  constructor(@Inject(IYahooToken) private yahooService: IYahoo) {}

  onSearchChange(search: any) {
    this.search$.next(search as string);
  }

  stringifyQuote(): TuiStringHandler<Quote | string> {
    return quote => typeof quote === 'string' ? quote : `${quote.shortname} (${quote.symbol})`;
  }
}
