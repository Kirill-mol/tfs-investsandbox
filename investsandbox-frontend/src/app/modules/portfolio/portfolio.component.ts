import { UpdaterService } from './../../../shared/services/updater.service';
import { Portfolio } from './../../../shared/models/portfolio.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['portfolio.component.less'],
})
export class PortfolioComponent implements OnInit {
  @Input()
  portfolio!: Portfolio;

  constructor(private updater: UpdaterService) {}

  ngOnInit() {
    this.updater.updateQuotes(this.portfolio.quotes);
    this.updater.update();
  }
}
