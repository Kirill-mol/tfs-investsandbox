import { AccountFromBackend } from './../models/accountFromBackend.model';
import { Currency } from './../models/currency.model';
import { UrlEnum } from './../models/url.model';
import { IBackendApi } from './../interfaces/IBackendApi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account.model';
import { Quote } from '../models/quote.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BackendApiService implements IBackendApi {
  constructor(private httpClient: HttpClient) {}

  private _parseAccount(account: AccountFromBackend): Account {
    return {
      email: account.email,
      name: account.nickname,
      portfolios: account.portfolios,
    };
  }

  editAccount(name?: string, email?: string, password?: string) {
    return this.httpClient
      .put<AccountFromBackend>(UrlEnum.API_ACCOUNT, {
        nickname: name,
        email,
        password,
      })
      .pipe(map((account) => this._parseAccount(account)));
  }

  getAccount() {
    return this.httpClient
      .get<AccountFromBackend>(UrlEnum.API_ACCOUNT)
      .pipe(map((account) => this._parseAccount(account)));
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(UrlEnum.API_LOGIN, {
      email,
      password,
    });
  }

  registration(name: string, email: string, password: string) {
    return this.httpClient
      .post<AccountFromBackend>(UrlEnum.API_REGISTER, {
        nickname: name,
        email,
        password,
      })
      .pipe(map((account) => this._parseAccount(account)));
  }

  newPortfolio(title: string, balance: number, currency: Currency) {
    return this.httpClient.post<any>(UrlEnum.API_PORTFOLIO, {
      name: title,
      balance,
      currency,
    });
  }

  deletePortfolio(title: string) {
    return this.httpClient.delete(`${UrlEnum.API_PORTFOLIO}/${title}`);
  }

  buyQuote(portfolioTitle: string, quote: Quote) {
    return this.httpClient.post<any>(`${UrlEnum.API_QUOTE}`, {
      portfolioName: portfolioTitle,
      ...quote,
    });
  }

  sellQuote(portfolioTitle: string, quote: Quote, quantity: number) {
    return this.httpClient.put<any>(`${UrlEnum.API_QUOTE}`, {
      portfolioName: portfolioTitle,
      price: quote.price,
      symbol: quote.symbol,
      quantity,
    });
  }
}
