import { Subscription } from 'rxjs';
import { Account } from './../../../shared/models/account.model';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';
import { ChangeDetectionStrategy, Component, Inject, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit, OnDestroy {
  private getAccountSubscription!: Subscription;

  account: Account = this.backendService.account;

  constructor(@Inject(IBackendToken) private backendService: IBackend) {

   }

  ngOnInit() {
    this.getAccountSubscription = this.backendService.getAccount().subscribe(() => {
      this.account = this.backendService.account;
    })
  }

  ngOnDestroy() {
    this.getAccountSubscription.unsubscribe();
  }

}
