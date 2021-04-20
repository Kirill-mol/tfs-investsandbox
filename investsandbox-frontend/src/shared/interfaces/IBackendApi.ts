import { Observable } from 'rxjs';
import { Portfolio } from './../models/portfolio.model';
import { Account } from './../models/account.model';
import { InjectionToken } from '@angular/core';

export const IBackendApiToken = new InjectionToken('IBackendApi');

export interface IBackendApi {
  account: Account;
  portfolios: Portfolio[];

  login(email: string, password: string): Observable<string>;

  registration(nickname: string, email: string, password: string): Observable<Account>;

  portfolioExists(title: string): boolean;

  getPortfolioByTitle(title: string) : Portfolio | undefined;
}