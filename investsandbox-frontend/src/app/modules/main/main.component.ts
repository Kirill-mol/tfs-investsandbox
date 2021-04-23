import { Account } from './../../../shared/models/account.model';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';
import { UpdaterService } from './../../../shared/services/updater.service';
import { Component, Inject, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.less'],
})
export class MainComponent implements OnInit {
  @Output()
  account: Account = this.backendService.account;

  constructor(
    private updater: UpdaterService,
    @Inject(IBackendToken) private backendService: IBackend
  ) {}

  ngOnInit() {
    this.backendService.getAccount().subscribe(
      () => {
        this.account = this.backendService.account;
        this.updater.update();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
