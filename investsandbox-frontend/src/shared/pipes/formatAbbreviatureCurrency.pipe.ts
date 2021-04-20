import { Currency } from './../models/currency.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAbbreviatureCurrency'
})

export class FormatAbbreviatureCurrencyPipe implements PipeTransform {
  transform(value: Currency): string {
    switch (value) {
      case 'EUR':
        return 'Евро';
      case 'RUB':
        return 'Рубль';
      case 'USD':
        return 'Доллар США';
    }
  }
}