import { Currency, CurrencyEnum } from './../models/currency.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAbbreviatureCurrency'
})

export class FormatAbbreviatureCurrencyPipe implements PipeTransform {
  transform(value: Currency): string {
    switch (value) {
      case CurrencyEnum.EUR:
        return 'Евро';
      case CurrencyEnum.RUB:
        return 'Рубль';
      case CurrencyEnum.USD:
        return 'Доллар США';
    }
    return value;
  }
}