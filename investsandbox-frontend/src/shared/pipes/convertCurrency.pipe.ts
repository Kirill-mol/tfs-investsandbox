import { IYahooApi, IYahooApiToken } from '../interfaces/IYahooApi';
import { Currency } from '../models/currency.model';
import { Inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertCurrency'
})

export class ConvertCurrencyPipe implements PipeTransform {
  constructor(@Inject(IYahooApiToken) private yahooService: IYahooApi) {}

  transform(value: number, from: Currency, to: Currency): number {
    if (from === to) {
      return value;
    }
    return this.yahooService.convertCurrencies(value, from, to);
  }
}