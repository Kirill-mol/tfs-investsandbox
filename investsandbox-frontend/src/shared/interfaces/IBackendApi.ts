import { Portfolio } from './../models/portfolio.model';
import { Currency } from './../models/currency.model';
import { Observable } from 'rxjs';
import { Account } from './../models/account.model';
import { InjectionToken } from '@angular/core';

export const IBackendApiToken = new InjectionToken('IBackendApi');

export interface IBackendApi {
  login(email: string, password: string): Observable<{email: string, token: string, expiration: number}>;

  registration(nickname: string, email: string, password: string): Observable<Account>;

  getAccount(): Observable<Account>;

  newPortfolio(title: string, balance: number, currency: Currency): Observable<Portfolio>;
}