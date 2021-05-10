import { NavigationService } from './../../../shared/services/navigation.service';
import { EventTypeEnum } from '../../../shared/models/eventType.model';
import { IForex, IForexToken } from './../../../shared/interfaces/IForex';
import { Subscription } from 'rxjs';
import { Account } from './../../../shared/models/account.model';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';
import { UpdaterService } from './../../../shared/services/updater.service';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { ErrorTypeEnum } from 'src/shared/models/errorType.model';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  private backendEventDetector!: Subscription;
  private updaterEventDetector!: Subscription;

  account: Account = this.backendService.account;

  constructor(
    private updater: UpdaterService,
    @Inject(IBackendToken) private backendService: IBackend,
    private navigator: NavigationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.backendService.initFromMain();
    this.backendEventDetector = this.backendService.eventDetector.subscribe((type) => {
      if (type === EventTypeEnum.EMAIL_EDITED) {
        this.navigator.toLogin();
      } else {
        this.account = this.backendService.account;
        this.updater.startMainUpdater();
        this.cd.markForCheck();
      }
    });
    this.updaterEventDetector = this.updater.eventDetector.subscribe(() => {
      this.account = this.backendService.account;
    });
  }

  ngOnDestroy() {
    this.backendEventDetector.unsubscribe();
    this.updaterEventDetector.unsubscribe();
    this.updater.cancelMainUpdater();
  }
}
