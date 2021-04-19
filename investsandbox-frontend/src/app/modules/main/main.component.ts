import { UpdaterService } from './../../../shared/services/updater.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.less'],
})
export class MainComponent implements OnInit {
  constructor(private updater: UpdaterService) {}

  ngOnInit() {
    this.updater.update();
  }
}
