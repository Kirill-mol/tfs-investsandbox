import { Currency } from './../models/currency.model';
import { UrlEnum } from './../models/url.model';
import { IBackendApi } from './../interfaces/IBackendApi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account.model';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';

@Injectable({providedIn: 'root'})
export class BackendApiService implements IBackendApi {
  constructor(private httpClient: HttpClient) { }

  editAccount(nickname?: string, email?: string, password?: string): Observable<Account> {
    return this.httpClient.put<Account>(UrlEnum.API_ACCOUNT, {
      nickname,
      email,
      password
    });
  }

  getAccount() {
    return this.httpClient.get<{email: string, nickname: string, portfolios: []}>(UrlEnum.API_ACCOUNT);
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(UrlEnum.API_LOGIN, {
      email,
      password
    });
  }

  registration(nickname: string, email: string, password: string) {
    return this.httpClient.post<any>(UrlEnum.API_REGISTER, {
      nickname,
      email,
      password
    });
  }

  newPortfolio(title: string, balance: number, currency: Currency) {
    return this.httpClient.post<any>(UrlEnum.API_PORTFOLIO, {
      name: title,
      balance,
      currency
    })
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
      quantity
    })
  }
}