import { NavigationService } from './../../../../shared/services/navigation.service';
import { AuthService } from './../../../../shared/services/auth.service';
import { IAuthToken } from './../../../../shared/interfaces/IAuth';
import { Account } from './../../../../shared/models/account.model';
import { Component, Inject } from '@angular/core';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
})
export class AccountComponent {
  account: Account | null;
  editFormOpened = false;

  constructor(
    @Inject(IBackendToken) private backendService: IBackend,
    @Inject(IAuthToken) private authService: AuthService,
    private navifationService: NavigationService
  ) {
    this.account = this.backendService.account;
  }

  turnEditForm() {
    this.editFormOpened = !this.editFormOpened;
  }

  logout() {
    this.authService.logout();
    this.navifationService.toLogin();
  }
}
