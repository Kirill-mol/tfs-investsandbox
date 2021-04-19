import { IBackendApi } from '../interfaces/IBackendApi';
import { Account } from '../models/account.model';
import { Injectable } from '@angular/core';
import { AccountsData } from '../test-data/accounts.data';

@Injectable({providedIn: 'root'})
export class BackendApiMockService implements IBackendApi {
  private _account: Account = AccountsData[0];

  get account() {
    return this._account;
  }

  get portfolios() {
    return this._account.portfolios;
  }

  constructor() { }
}