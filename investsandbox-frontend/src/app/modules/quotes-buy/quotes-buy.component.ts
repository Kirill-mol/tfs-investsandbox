import { Quote } from './../../../shared/models/quote.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quotes-buy',
  templateUrl: './quotes-buy.component.html',
  styleUrls: ['./quotes-buy.component.less'],
})
export class QuotesBuyComponent {
  readonly items$!: Observable<ReadonlyArray<Quote> | null>;

  form = new FormGroup({
    search: new FormControl(),
  });
}
