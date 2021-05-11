import { NotificationsService } from 'src/shared/services/notifications.service';
import { NavigationService } from './../../../shared/services/navigation.service';
import { EventTypeEnum } from '../../../shared/models/eventType.model';
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
    private notifications: NotificationsService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.backendService.initFromMain();
    this.backendEventDetector = this.backendService.eventDetector.subscribe((type) => {
      if (type === EventTypeEnum.EMAIL_CHANGED) {
        this.navigator.toLogin();
      } else if (type === EventTypeEnum.PASSWORD_CHANGED) {
        this.notifications.showSuccess('Пароль изменен');
      } else if (type === EventTypeEnum.ACCOUNT_LOADED) {
        this.account = this.backendService.account;
        this.updater.startMainUpdater();
        this.cd.markForCheck();
      } else if (type === EventTypeEnum.ACCOUNT_EDITED) {
        this.notifications.showSuccess('Данные аккаунта изименены');
        this.cd.markForCheck();
      } else if (type === EventTypeEnum.PORTFOLIO_CREATED) {
        this.notifications.showSuccess('Портфель успешно создан');
      }
    });
    this.updaterEventDetector = this.updater.eventDetector.subscribe(() => {
      this.account = this.backendService.account;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.backendEventDetector.unsubscribe();
    this.updaterEventDetector.unsubscribe();
    this.updater.cancelMainUpdater();
  }
}
