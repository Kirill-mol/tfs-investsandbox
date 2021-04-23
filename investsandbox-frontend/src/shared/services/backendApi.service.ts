import { Currency } from './../models/currency.model';
import { UrlEnum } from './../models/url.model';
import { IBackendApi } from './../interfaces/IBackendApi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account.model';

@Injectable({providedIn: 'root'})
export class BackendApiService implements IBackendApi {
  constructor(private httpClient: HttpClient) { }

  getAccount() {
    return this.httpClient.get<{email: string, nickname: string, portfolios: []}>(UrlEnum.ACCOUNT);
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(UrlEnum.LOGIN, {
      email,
      password
    });
  }

  registration(nickname: string, email: string, password: string) {
    return this.httpClient.post<any>(UrlEnum.REGISTER, {
      nickname,
      email,
      password
    });
  }

  newPortfolio(title: string, balance: number, currency: Currency) {
    return this.httpClient.post<any>(UrlEnum.PORTFOLIO, {
      name: title,
      balance,
      currency
    })
  }
}