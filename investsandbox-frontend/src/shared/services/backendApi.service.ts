import { IBackendApi } from './../interfaces/IBackendApi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { Portfolio } from '../models/portfolio.model';

const host = 'http://localhost:8091';

@Injectable({providedIn: 'root'})
export class BackendApiService implements IBackendApi {
  private _account: Account = {
    nickname: '',
    email: '',
    portfolios: []
  };

  get account() {
    return this._account;
  }
  
  get portfolios() {
    return this._account.portfolios;
  }

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    return this.httpClient.get<string>(`${host}/auth/login`);
  }

  registration(nickname: string, email: string, password: string): Observable<Account> {
    return this.httpClient.post<any>(`${host}/register`, {
      nickname,
      email,
      password
    });
  }

  portfolioExists(title: string): boolean {
    return this.getPortfolioByTitle(title) ? true : false;
  }

  getPortfolioByTitle(title: string): Portfolio | undefined {
    return this.portfolios.find(portfolio => portfolio.title === title);
  }
  
}