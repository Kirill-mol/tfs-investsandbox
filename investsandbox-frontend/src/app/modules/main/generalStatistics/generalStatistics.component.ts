import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-statistics',
  templateUrl: 'generalStatistics.component.html',
  styleUrls: ['generalStatistics.component.less']
})

export class GeneralStatisticsComponent implements OnInit {
  form = new FormGroup({
    currency: new FormControl('rub'),
  })

  constructor() { }

  ngOnInit() { }
}


