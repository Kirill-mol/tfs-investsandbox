import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Quote } from 'src/shared/models/quote.model';

@Component({
  selector: 'app-quotes-sell',
  templateUrl: './quotes-sell.component.html',
  styleUrls: ['./quotes-sell.component.less']
})
export class QuotesSellComponent implements OnInit {
  @Input()
  quote!: Quote;

  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      count: new FormControl(null, [Validators.required, Validators.max(this.quote.count), Validators.min(1)])
    })
  }
}
