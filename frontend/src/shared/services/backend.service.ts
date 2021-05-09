import { IStatistic, IStatisticToken } from './../interfaces/IStatistic';
import { RangeEnum } from './../models/range.model';
import { ICalculate, ICalculateToken } from './../interfaces/ICalculate';
import { IStockMarket } from './../interfaces/IStockMarket';
import { IStockMarketToken } from 'src/shared/interfaces/IStockMarket';
import { Portfolio } from './../models/portfolio.model';
import { Currency } from './../models/currency.model';
import {
  catchError,
  map,
  tap,
  switchMap,
  mergeMap,
  filter,
} from 'rxjs/operators';
import { IBackendApi, IBackendApiToken } from './../interfaces/IBackendApi';
import { IBackend } from './../interfaces/IBackend';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { of } from 'rxjs';
import { Quote } from '../models/quote.model';

@Injectable({ providedIn: 'root' })
export class BackendService implements IBackend {
  private _account: Account = {
    email: '',
    nickname: '',
    portfolios: [],
  };

  private _quotesSymbols = new Set<string>();

  readonly changeDetector = new EventEmitter<void>();

  get account() {
    return this._account;
  }

  get portfolios() {
    return this._account.portfolios;
  }

  get quotesSymbols() {
    return [...this._quotesSymbols];
  }

  constructor(
    @Inject(IBackendApiToken) private backendApiService: IBackendApi,
    @Inject(ICalculateToken) private calculator: ICalculate,
    @Inject(IStockMarketToken) private stockMarketService: IStockMarket,
    @Inject(IStatisticToken) private statisticService: IStatistic
  ) {}

  private parsePortfolio(portfolio: any): Portfolio {
    const quotesParser = (quotes: any[]): Quote[] =>
      quotes.map((quote) => {
        return {
          ...quote,
          price: 0,
          history: [],
        };
      });

    return {
      title: portfolio.name,
      currency: portfolio.currency,
      initBalance: portfolio.initBalance,
      balance: portfolio.balance,
      quotes: quotesParser(portfolio.quotes),
      history: {
        onMonth: portfolio.monthHistory,
        onAllTime: portfolio.allTimeHistory,
      },
      realBalance: 0,
      income: {
        percent: {
          onAlltime: 0,
          onMonth: 0,
        },
        absolute: 0,
      },
    };
  }

  editAccountInfo(nickname?: string, email?: string) {
    this.backendApiService.editAccount(nickname, email).subscribe(
      (account) => {
        this._account.nickname = account.nickname;
        this._account.email = account.email;
        this.changeDetector.emit();
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  editAccountPassword(password: string) {
    this.backendApiService
      .editAccount(undefined, undefined, password)
      .pipe(
        map(() => null),
        catchError((error) => of(`Ошибка: ${error}`))
      )
      .subscribe((error) => {
        if (error) {
          throw new Error(error);
        }
      });
  }

  getAccount() {
    return this.backendApiService.getAccount().pipe(
      map((account) => {
        account.portfolios = account.portfolios.map((portfolio) =>
          this.parsePortfolio(portfolio)
        );
        return account;
      }),
      tap((account) => {
        this._account = account;
      })
    );
  }

  initFromMain() {
    const quotes: { [symbol: string]: number } = {};

    this.getAccount()
      .pipe(
        map((account) =>
          account.portfolios.map((portfolio) => portfolio.quotes)
        ),
        map((quotes) =>
          Array<Quote>()
            .concat(...quotes)
            .map((quote) => quote.symbol)
        ),
        tap((symbols) => {
          this._quotesSymbols = new Set(symbols);
        }),
        switchMap(() =>
          this.stockMarketService.getQuotesBySymbols(this.quotesSymbols)
        ),
        map((quotes) => {
          return this._account.portfolios.map((portfolio) => {
            portfolio.quotes = portfolio.quotes.map((quote) => {
              const quote2 = quotes.filter(
                (quote2) => quote2.symbol === quote.symbol
              )[0];

              return {
                ...quote,
                price: quote2.price,
                history: quote2.history,
              };
            });
            return portfolio;
          });
        }),
        map((portfolios) =>
          portfolios.map((portfolio) => {
            portfolio.realBalance = this.calculator.calcRealBalance(portfolio);
            portfolio.income.absolute = this.calculator.calcAbsoluteIncome(
              portfolio
            );
            portfolio.income.percent.onAlltime = this.calculator.calcPercentIncome(
              portfolio,
              RangeEnum.ALL
            );
            portfolio.income.percent.onMonth = this.calculator.calcPercentIncome(
              portfolio,
              RangeEnum.MONTH
            );
            return portfolio;
          })
        ),
        tap((portfolios) => {
          this.statisticService.updateTopPortfoliosOfIncome(portfolios);
        })
      )
      .subscribe(
        (portfolios) => {
          this._account.portfolios = portfolios;
          this.changeDetector.emit();
        },
        (error) => {
          throw new Error(error);
        }
      );
  }

  initFromPortfolio(portfolioTitle: string) {
    let portfolioId: number;

    this.getAccount()
      .pipe(
        tap(() => {
          portfolioId = this.getPortfolioIdByTitle(portfolioTitle);
        }),
        map((account) =>
          account.portfolios[portfolioId].quotes.map((quote) => quote.symbol)
        ),
        tap((symbols) => {
          this._quotesSymbols = new Set(symbols);
        }),
        switchMap(() =>
          this.stockMarketService.getQuotesBySymbols(this.quotesSymbols)
        ),
        mergeMap((quotes) =>
          this.stockMarketService.getQuotesWithHistory(quotes)
        ),
        map((quotes) => {
          return this._account.portfolios[portfolioId].quotes.map(
            (quote, index) => {
              quote = {
                ...quote,
                price: quotes[index].price,
                history: quotes[index].history,
              };
              return quote;
            }
          );
        }),
        map((quotes) => {
          this._account.portfolios[portfolioId].quotes = quotes;
          return this._account.portfolios[portfolioId];
        }),
        map((portfolio) => {
          portfolio.realBalance = this.calculator.calcRealBalance(portfolio);
          portfolio.income.absolute = this.calculator.calcAbsoluteIncome(
            portfolio
          );
          portfolio.income.percent.onAlltime = this.calculator.calcPercentIncome(
            portfolio,
            RangeEnum.ALL
          );
          portfolio.income.percent.onMonth = this.calculator.calcPercentIncome(
            portfolio,
            RangeEnum.MONTH
          );
          return portfolio;
        })
      )
      .subscribe(
        (portfolio) => {
          this._account.portfolios[portfolioId] = portfolio;
          this.changeDetector.emit();
        },
        (error) => {
          throw new Error(error);
        }
      );
  }

  portfolioExists(title: string) {
    return this.getPortfolioIdByTitle(title) !== -1 ? true : false;
  }

  getPortfolioIdByTitle(title: string) {
    return this.portfolios?.findIndex((portfolio) => portfolio.title === title);
  }

  newPortfolio(title: string, balance: number, currency: Currency) {
    this.backendApiService
      .newPortfolio(title, balance, currency)
      .pipe(map((portfolio) => this.parsePortfolio(portfolio)))
      .subscribe(
        (portfolio) => {
          this._account.portfolios.push(portfolio);
          this.changeDetector.emit();
        },
        (error) => {
          throw new Error(error);
        }
      );
  }

  buyQuote(portfolioTitle: string, quote: Quote) {
    this.backendApiService
      .buyQuote(portfolioTitle, quote)
      .pipe(map((portfolio) => this.parsePortfolio(portfolio)))
      .subscribe(
        (portfolio) => {
          const id = this.getPortfolioIdByTitle(portfolioTitle);

          this._account.portfolios[id].balance = portfolio.balance;
          this._account.portfolios[id].quotes = portfolio.quotes.map(
            (quote2) => {
              if (quote2.symbol === quote.symbol) {
                quote2.price = quote.price;
                quote2.history = quote.history;
              } else {
                const portfolioQuote = this._account.portfolios[
                  id
                ].quotes.filter((quote) => quote.symbol === quote2.symbol)[0];
                if (portfolioQuote) {
                  quote2.price = portfolioQuote.price;
                  quote2.history = portfolioQuote.history;
                }
              }
              return quote2;
            }
          );
          this._quotesSymbols.add(quote.symbol);
          this.changeDetector.emit();
        },
        (error) => {
          throw new Error(error);
        }
      );
  }

  sellQuote(portfolioTitle: string, quote: Quote, count: number) {
    console.log(portfolioTitle);
    this.backendApiService.sellQuote(portfolioTitle, quote, count).subscribe(
      (x) => {
        console.log(x);
        this.changeDetector.emit();
      },
      (error) => {
        throw new Error(error);
      }
    );
  }
}
