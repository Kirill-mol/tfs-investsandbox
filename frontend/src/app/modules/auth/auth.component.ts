import { NavigationService } from './../../../shared/services/navigation.service';
import { IAuth, IAuthToken } from './../../../shared/interfaces/IAuth';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthComponent implements OnInit {
  constructor(@Inject(IAuthToken) private authService: IAuth, private navigator: NavigationService) {}

  ngOnInit() {
    if (this.authService.getTokenValue()) {
      this.navigator.toMain();
    }
  }
}