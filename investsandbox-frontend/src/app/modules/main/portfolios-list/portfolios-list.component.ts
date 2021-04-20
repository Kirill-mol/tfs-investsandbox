import { IBackendApi, IBackendApiToken } from './../../../../shared/interfaces/IBackendApi';
import { Portfolio } from './../../../../shared/models/portfolio.model';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-portfolios-list',
  templateUrl: 'portfolios-list.component.html',
  styleUrls: ['portfolios-list.component.less']
})

export class PortfoliosListComponent {
  portfoliosAddFormOpened = false;
  portfolios!: Portfolio[];

  constructor(@Inject(IBackendApiToken) private backendService: IBackendApi) {
    this.portfolios = backendService.portfolios;
   }

  turnAddPortfolioForm() {
    this.portfoliosAddFormOpened = !this.portfoliosAddFormOpened;
  }
}