import { Account } from './../../../../shared/models/account.model';
import { AuthService } from './../../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less']
})
export class AccountComponent implements OnInit {
  account: Account;
  editFormOpened = false;

  constructor(private authService: AuthService) { 
    this.account = this.authService.account;
  }

  ngOnInit() {
  }

  turnEditForm() {
    this.editFormOpened = !this.editFormOpened;
  }

}
