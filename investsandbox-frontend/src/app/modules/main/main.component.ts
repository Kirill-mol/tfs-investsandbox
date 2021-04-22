import { NavigationService } from './../../../shared/services/navigation.service';
import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';
import { UpdaterService } from './../../../shared/services/updater.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.less'],
})
export class MainComponent implements OnInit {
  constructor(
    private updater: UpdaterService,
    @Inject(IBackendToken) private backendService: IBackend
  ) {}

  ngOnInit() {
    this.backendService.getAccount().subscribe(
      () => {
        this.updater.update();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
