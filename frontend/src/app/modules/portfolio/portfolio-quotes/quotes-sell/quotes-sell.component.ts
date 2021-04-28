import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { Quote } from 'src/shared/models/quote.model';

@Component({
  selector: 'app-quotes-sell',
  templateUrl: './quotes-sell.component.html',
  styleUrls: ['./quotes-sell.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesSellComponent implements OnInit {
  @Input()
  quote!: Quote;

  @Input()
  portfolioTitle!: string;

  form!: FormGroup;

  constructor(@Inject(IBackendToken) private backendService: IBackend) {}

  ngOnInit() {
    this.form = new FormGroup({
      count: new FormControl(null, [Validators.required, Validators.max(this.quote.quantity), Validators.min(1)])
    })
  }

  sellQuote() {
    this.backendService.sellQuote(this.portfolioTitle, this.quote, this.form.get('count')?.value as number);
  }
}
