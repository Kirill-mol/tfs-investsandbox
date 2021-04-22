import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const IAuthToken = new InjectionToken('IAuth');

export interface IAuth {
  login(email: string, password: string): Observable<void>; 

  logout(): void;

  registration(nickname: string, email: string, password: string): Observable<any>;

  getTokenValue(): string | null;
}