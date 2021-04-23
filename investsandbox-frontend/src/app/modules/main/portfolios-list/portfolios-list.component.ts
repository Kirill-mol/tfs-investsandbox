import { Portfolio } from './../../../../shared/models/portfolio.model';
import { Component, Inject } from '@angular/core';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';

@Component({
  selector: 'app-portfolios-list',
  templateUrl: 'portfolios-list.component.html',
  styleUrls: ['portfolios-list.component.less']
})

export class PortfoliosListComponent {
  portfoliosAddFormOpened = false;
  portfolios: Portfolio[] | null;

  constructor(@Inject(IBackendToken) private backendService: IBackend) {
    this.portfolios = backendService.portfolios;
   }

  turnAddPortfolioForm() {
    this.portfoliosAddFormOpened = !this.portfoliosAddFormOpened;
  }
}