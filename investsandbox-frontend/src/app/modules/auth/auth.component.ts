import { NavigationService } from './../../../shared/services/navigation.service';
import { IAuth, IAuthToken } from './../../../shared/interfaces/IAuth';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.less']
})

export class AuthComponent implements OnInit {
  constructor(@Inject(IAuthToken) private authService: IAuth, private navigationService: NavigationService) {}

  ngOnInit() {
    if (this.authService.getTokenValue()) {
      this.navigationService.toMain();
    }
  }
}