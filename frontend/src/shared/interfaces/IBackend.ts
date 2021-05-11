import { ErrorType } from './../models/errorType.model';
import { EventType } from '../models/eventType.model';
import { Observable } from 'rxjs';
import { Portfolio } from './../models/portfolio.model';
import { Account } from './../models/account.model';
import { EventEmitter, InjectionToken } from '@angular/core';
import { Currency } from '../models/currency.model';
import { Quote } from '../models/quote.model';

export const IBackendToken = new InjectionToken('IBackend');

export interface IBackend {
  account: Account;

  portfolios: Portfolio[];

  quotesSymbols: string[];
  
  eventDetector: EventEmitter<EventType>;

  getAccount(): Observable<Account>;

  initFromMain(): void;

  initFromPortfolio(portfolioTitle: string): void;

  editAccountInfo(nickname?: string, email?: string): void;

  editAccountPassword(password: string): void;

  portfolioExists(title: string): boolean;

  getPortfolioIdByTitle(title: string): number;

  newPortfolio(title: string, balance: number, currency: Currency): void;

  deletePortfolio(title: string): void;

  buyQuote(portfolioTitle: string, quote: Quote): void;

  sellQuote(portfolioTitle: string, quote: Quote, quantity: number): void;
}
