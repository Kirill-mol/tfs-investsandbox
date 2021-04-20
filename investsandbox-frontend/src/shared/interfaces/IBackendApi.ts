import { Portfolio } from './../models/portfolio.model';
import { Account } from './../models/account.model';
import { InjectionToken } from '@angular/core';

export const IBackendApiToken = new InjectionToken('IBackendApi');

export interface IBackendApi {
  account: Account;
  portfolios: Portfolio[];
}