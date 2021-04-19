import { Currency } from './../../../../shared/models/currency.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolios-add',
  templateUrl: 'portfolios-add.component.html',
  styleUrls: ['portfolios-add.component.less'],
})
export class PortfoliosAddComponent {
  currencies: Currency[] = ['RUB', 'USD', 'EUR'];

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    currency: new FormControl(this.currencies[0]),
    initBalance: new FormControl(1000, [
      Validators.required,
      Validators.min(1),
    ]),
  });
}
