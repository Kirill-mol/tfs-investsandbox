import { Account } from './../shared/models/account.model';
import { IBackendApi, IBackendApiToken } from './../shared/interfaces/IBackendApi';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'InvestSandbox';
  account: Account;

  constructor(@Inject(IBackendApiToken) private backendService: IBackendApi) {
    this.account = backendService.account;
  }

  ngOnInit() {}
}
