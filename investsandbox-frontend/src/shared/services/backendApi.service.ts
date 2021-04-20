import { IBackendApi } from './../interfaces/IBackendApi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { Portfolio } from '../models/portfolio.model';

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

  auth(email: string, password: string): Observable<string> {
    throw new Error('Method not implemented.');
  }

  registration(nickname: string, email: string, password: string): Observable<string> {
    throw new Error('Method not implemented.');
  }

  portfolioExists(title: string): boolean {
    return this.getPortfolioByTitle(title) ? true : false;
  }

  getPortfolioByTitle(title: string): Portfolio | undefined {
    return this.portfolios.find(portfolio => portfolio.title === title);
  }
  
}