import { Portfolio } from './../../../../../shared/models/portfolio.model';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';
import { IStockMarketToken } from 'src/shared/interfaces/IStockMarket';
import { IStockMarket } from '../../../../../shared/interfaces/IStockMarket';
import { Quote } from '../../../../../shared/models/quote.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ChangeDetectorRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import {
  filter,
  startWith,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  catchError,
} from 'rxjs/operators';
import { TuiStringHandler } from '@taiga-ui/cdk';

@Component({
  selector: 'app-quotes-buy',
  templateUrl: './quotes-buy.component.html',
  styleUrls: ['./quotes-buy.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotesBuyComponent implements OnInit, OnDestroy {
  @Input()
  portfolio!: Portfolio;

  search$ = new Subject<string>();

  items$: Observable<ReadonlyArray<Quote> | null> = this.search$.pipe(
    filter((value) => value != '' && value != null),
    debounceTime(500),
    distinctUntilChanged(),
    map((search) => search.toLowerCase()),
    switchMap((searchLowerCase) =>
      this.stockMarketService.searchQuotes(searchLowerCase, this.portfolio.currency)
    ),
    catchError((error) => {
      console.log(error);
      return [];
    }),
    startWith([])
  );

  getQuotePrice$!: Subscription;

  form = new FormGroup({
    quote: new FormControl(null, [Validators.required]),
    count: new FormControl(1, [Validators.min(1), Validators.required]),
  });

  get quote() {
    return this.form.get('quote');
  }

  get count() {
    return this.form.get('count');
  }

  constructor(
    @Inject(IStockMarketToken) private stockMarketService: IStockMarket,
    @Inject(IBackendToken) private backendService: IBackend,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getQuotePrice$ = interval(10000)
      .pipe(
        map(() => this.quote?.value as Quote),
        filter((quote) => quote != null && this.count?.valid === true),
        switchMap((quote) => this.stockMarketService.getQuotesPrice([quote]))
      )
      .subscribe((price) => {
        this.quote?.setValue({
          ...this.quote?.value,
          price: price[0],
        });
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.getQuotePrice$.unsubscribe();
  }

  onSearchChange(search: any) {
    this.search$.next(search as string);
  }

  stringifyQuote(): TuiStringHandler<Quote | string> {
    return (quote) =>
      typeof quote === 'string'
        ? quote
        : `${quote.shortname} (${quote.symbol})`;
  }

  buyQuote() {
    console.log(1);
    this.backendService.buyQuote(this.portfolio.title, {
      ...this.quote?.value,
      quantity: this.count?.value,
    });
  }
}
