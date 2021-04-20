import { IBackendApi } from '../interfaces/IBackendApi';
import { Account } from '../models/account.model';
import { Injectable } from '@angular/core';
import { AccountsData } from '../test-data/accounts.data';

@Injectable({providedIn: 'root'})
export class BackendApiMockService {
  private _account: Account = AccountsData[0];

  get account() {
    return this._account;
  }

  get portfolios() {
    return this._account.portfolios;
  }

  getPortfolioByTitle(title: string) {
    return this.portfolios.find(portfolio => portfolio.title === title);
  }

  portfolioExists(title: string) {
    return this.getPortfolioByTitle(title) ? true : false;
  }
}