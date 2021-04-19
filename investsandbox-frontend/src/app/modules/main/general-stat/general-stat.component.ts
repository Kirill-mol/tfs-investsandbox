import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-general-stat',
  templateUrl: 'general-stat.component.html',
  styleUrls: ['general-stat.component.less'],
})
export class GeneralStatComponent {
  formCurrency = new FormGroup({
    currency: new FormControl('RUB'),
  });

  formTimeRange = new FormGroup({
    range: new FormControl('month'),
  });
}
