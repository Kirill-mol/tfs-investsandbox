import { IForex, IForexToken } from './../interfaces/IForex';
import { Currency } from './../models/currency.model';
import { Inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertCurrency'
})

export class ConvertCurrencyPipe implements PipeTransform {
  constructor(@Inject(IForexToken) private forex: IForex) {}

  transform(value: number, from: Currency, to: Currency): any {
    return this.forex.convertCurrencies(from, to, value);
  }
}