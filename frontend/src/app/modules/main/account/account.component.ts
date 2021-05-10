import { AuthFormTypeEnum } from './../../../../shared/models/authFormType.model';
import { NavigationService } from './../../../../shared/services/navigation.service';
import { AuthService } from './../../../../shared/services/auth.service';
import { IAuthToken } from './../../../../shared/interfaces/IAuth';
import { Account } from './../../../../shared/models/account.model';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  @Input()
  nickname!: string;

  @Input()
  email!: string;

  editAccountFormOpened = false;
  editPasswordFormOpened = false;
  authFormType = AuthFormTypeEnum;

  constructor(
    @Inject(IAuthToken) private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  turnEditAccountForm() {
    this.editAccountFormOpened = !this.editAccountFormOpened;
    if (this.editAccountFormOpened) {
      this.editPasswordFormOpened = false;
    }
  }

  turnEditPasswordForm() {
    this.editPasswordFormOpened = !this.editPasswordFormOpened;
    if (this.editPasswordFormOpened) {
      this.editAccountFormOpened = false;
    }
  }

  logout() {
    this.authService.logout();
    this.navigationService.toLogin();
  }
}
