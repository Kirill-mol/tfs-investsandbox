import { Account } from '../models/account.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  private _account: Account = {
    id: 1,
    login: 'costarev'
  }

  get account() {
    return this._account;
  }

  constructor() { }
}