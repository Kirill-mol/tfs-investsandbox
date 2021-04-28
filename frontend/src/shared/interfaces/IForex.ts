import { Observable } from 'rxjs';
import { Range } from '../models/range.model';
import { Currency } from '../models/currency.model';
import { Quote } from '../models/quote.model';
import { InjectionToken } from '@angular/core';

export const IForexToken = new InjectionToken('IForex');

export interface IForex {
  convertCurrencies(from: Currency, to: Currency, value?: number): number;

  updateForex(): Observable<void>;
}