import { NavigationService } from './../../../shared/services/navigation.service';
import { ChangeTypeEnum } from './../../../shared/models/changeType.model';
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

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  private backendChangeDetector!: Subscription;
  private updating!: Subscription;
  private forexSubscription!: Subscription;

  account: Account = this.backendService.account;

  constructor(
    private updater: UpdaterService,
    @Inject(IBackendToken) private backendService: IBackend,
    @Inject(IForexToken) private forex: IForex,
    private navigator: NavigationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.backendService.initFromMain();
    this.forexSubscription = this.forex.updateForex().subscribe();
    this.backendChangeDetector = this.backendService.changeDetector.subscribe((type) => {
      if (type && type === ChangeTypeEnum.EMAIL_EDITED) {
        this.navigator.toLogin();
      } else {
        this.account = this.backendService.account;
        this.updater.startMainUpdater();
        this.cd.markForCheck();
      }
    });
    this.updating = this.updater.subj.subscribe(() => {
      this.account = this.backendService.account;
    });
  }

  ngOnDestroy() {
    this.backendChangeDetector.unsubscribe();
    this.updating.unsubscribe();
    this.forexSubscription.unsubscribe();
    this.updater.cancelMainUpdater();
  }
}
