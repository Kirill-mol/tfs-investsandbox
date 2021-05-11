import { StorageService } from './storage.service';
import { IBackendApi, IBackendApiToken } from './../interfaces/IBackendApi';
import { IAuth } from './../interfaces/IAuth';
import { Inject, Injectable } from '@angular/core';
import { Token } from '../models/token.model';
import { map, switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService implements IAuth {
  constructor(
    @Inject(IBackendApiToken) private backendApiService: IBackendApi,
    private storage: StorageService
  ) {}

  private getToken(): Token | null {
    return this.storage.getItem('token');
  }

  private setToken(value: string, expiration: number) {
    const token: Token = {
      value,
      expiration: expiration + Date.now(),
    };

    this.storage.setItem('token', token);
  }

  private removeToken() {
    this.storage.removeItem('token');
  }

  login(email: string, password: string) {
    return this.backendApiService.login(email, password).pipe(
      map((res) => {
        this.setToken(res.token, res.expiration);
      })
    );
  }

  logout() {
    this.removeToken();
  }

  registration(nickname: string, email: string, password: string) {
    return this.backendApiService
      .registration(nickname, email, password)
      .pipe(switchMap(() => this.login(email, password)));
  }

  getTokenValue() {
    const token = this.getToken();

    if (token) {
      if (token.expiration > Date.now()) {
        return token.value;
      } else {
        this.removeToken();
      }
    }

    return null;
  }
}
