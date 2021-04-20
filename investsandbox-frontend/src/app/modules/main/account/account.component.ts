import {
  IBackendApi,
  IBackendApiToken,
} from './../../../../shared/interfaces/IBackendApi';
import { Account } from './../../../../shared/models/account.model';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
})
export class AccountComponent {
  account: Account;
  editFormOpened = false;

  constructor(@Inject(IBackendApiToken) private backendService: IBackendApi) {
    this.account = this.backendService.account;
  }

  turnEditForm() {
    this.editFormOpened = !this.editFormOpened;
  }
}
