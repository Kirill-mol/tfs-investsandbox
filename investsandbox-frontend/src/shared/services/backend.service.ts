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

  getAccount() {
    return this.backendApiService.getAccount().pipe(map(account => {
      this._account = account;
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
      this._account?.portfolios.push(portfolio);
    }));
  }
}
