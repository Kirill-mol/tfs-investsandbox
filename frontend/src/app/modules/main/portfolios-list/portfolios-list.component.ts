import { UpdaterService } from './../../../../shared/services/updater.service';
import { Portfolio } from './../../../../shared/models/portfolio.model';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';

@Component({
  selector: 'app-portfolios-list',
  templateUrl: 'portfolios-list.component.html',
  styleUrls: ['portfolios-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PortfoliosListComponent {
  @Input()
  portfolios!: Portfolio[];

  portfoliosAddFormOpened = false;

  turnAddPortfolioForm() {
    this.portfoliosAddFormOpened = !this.portfoliosAddFormOpened;
  }
}