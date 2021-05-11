import { Subscription } from 'rxjs';
import { UpdaterService } from './../../../../shared/services/updater.service';
import { NavigationService } from './../../../../shared/services/navigation.service';
import { Portfolio } from './../../../../shared/models/portfolio.model';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-portfolios-item',
  templateUrl: 'portfolios-item.component.html',
  styleUrls: ['portfolios-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfoliosItemComponent implements OnInit, OnDestroy {
  private updaterEventDetector!: Subscription;

  @Input()
  portfolio!: Portfolio;

  constructor(
    private navigator: NavigationService,
    private updater: UpdaterService,
    private cd: ChangeDetectorRef
  ) {}

  toPortfolio() {
    this.navigator.toPortfolio(this.portfolio.title);
  }

  ngOnInit() {
    this.updaterEventDetector = this.updater.eventDetector.subscribe(() => {
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.updaterEventDetector.unsubscribe();
  }
}
