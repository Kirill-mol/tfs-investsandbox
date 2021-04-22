import { Observable } from 'rxjs';
import { Portfolio } from './../models/portfolio.model';
import { Account } from './../models/account.model';
import { InjectionToken } from '@angular/core';
import { Currency } from '../models/currency.model';

export const IBackendToken = new InjectionToken('IBackend');

export interface IBackend {
  account: Account;
  portfolios: Portfolio[];

  getAccount(): Observable<void>;

  portfolioExists(title: string): boolean;

  getPortfolioByTitle(title: string) : Portfolio | undefined;

  newPortfolio(title: string, balance: number, currency: Currency): Observable<void>;
}