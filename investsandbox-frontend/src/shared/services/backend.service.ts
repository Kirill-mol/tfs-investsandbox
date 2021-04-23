import { Portfolio } from './../models/portfolio.model';
import { Currency } from './../models/currency.model';
import { map } from 'rxjs/operators';
import { IBackendApi, IBackendApiToken } from './../interfaces/IBackendApi';
import { IBackend } from './../interfaces/IBackend';
import { Inject, Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({ providedIn: 'root' })
export class BackendService implements IBackend {
  private _account: Account = {
    email: '',
    nickname: '',
    portfolios: []
  };

  get account() {
    return this._account;
  }

  get portfolios() {
    return this._account.portfolios;
  }

  constructor(
    @Inject(IBackendApiToken) private backendApiService: IBackendApi
  ) {}

  private parsePortfolio(portfolio: any): Portfolio {
    return {
      title: portfolio.name,
      currency: portfolio.currency,
      initBalance: portfolio.initBalance,
      balance: portfolio.balance,
      quotes: portfolio.quotes,
      history: {
        onMonth: portfolio.monthHistory,
        onAllTime: portfolio.allTimeHistory
      }
    }
  }

  getAccount() {
    return this.backendApiService.getAccount().pipe(map(account => {
      this._account = {
        email: account.email,
        nickname: account.nickname,
        portfolios: account.portfolios.map(portfolio => this.parsePortfolio(portfolio))
      }
    }));
  }

  portfolioExists(title: string) {
    return this.getPortfolioByTitle(title) ? true : false;
  }

  getPortfolioByTitle(title: string) {
    return this.portfolios?.find((portfolio) => portfolio.title === title);
  }

  newPortfolio(title: string, balance: number, currency: Currency) {
    return this.backendApiService.newPortfolio(title, balance, currency).pipe(map(portfolio => {
      console.log(this.parsePortfolio(portfolio), portfolio);
      this._account.portfolios.push(this.parsePortfolio(portfolio));
    }));
  }
}
