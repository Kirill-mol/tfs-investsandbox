import { Portfolio } from './../models/portfolio.model';
import { Currency } from './../models/currency.model';
import { Observable } from 'rxjs';
import { Account } from './../models/account.model';
import { InjectionToken } from '@angular/core';
import { Quote } from '../models/quote.model';

export const IBackendApiToken = new InjectionToken('IBackendApi');

export interface IBackendApi {
  login(email: string, password: string): Observable<{email: string, token: string, expiration: number}>;

  registration(nickname: string, email: string, password: string): Observable<Account>;

  getAccount(): Observable<Account>;

  editAccount(nickname?: string, email?: string, password?: string): Observable<Account>;

  newPortfolio(title: string, balance: number, currency: Currency): Observable<any>;

  buyQuote(portfolioName: string, quote: Quote): Observable<any>;

  sellQuote(portfolioName: string, quote: Quote, quantity: number): Observable<any>;
}