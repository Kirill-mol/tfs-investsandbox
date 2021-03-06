import { IBackend } from './../../../../shared/interfaces/IBackend';
import { IBackendToken } from 'src/shared/interfaces/IBackend';
import { CurrencyEnum } from './../../../../shared/models/currency.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiOrientation } from '@taiga-ui/core';

@Component({
  selector: 'app-portfolios-add',
  templateUrl: 'portfolios-add.component.html',
  styleUrls: ['portfolios-add.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfoliosAddComponent {
  currencies = [CurrencyEnum.RUB, CurrencyEnum.EUR, CurrencyEnum.USD];

  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    currency: new FormControl(this.currencies[0]),
    initBalance: new FormControl(1000, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  isMobile = window.innerWidth <= 430;

  tuiVOrientation = TuiOrientation.Vertical;

  tuiHOrientation = TuiOrientation.Horizontal;

  constructor(@Inject(IBackendToken) private backendService: IBackend) {}

  submitForm() {
    this.backendService.newPortfolio(
      this.form.get('title')?.value,
      Number.parseInt(this.form.get('initBalance')?.value),
      this.form.get('currency')?.value
    );
  }
}
