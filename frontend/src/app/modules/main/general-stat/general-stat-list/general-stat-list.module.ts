import { SharedModule } from './../../../../../shared/modules/shared.module';
import { GeneralStatListContentComponent } from './general-stat-list-content/general-stat-list-content.component';
import { NgModule } from '@angular/core';

import { GeneralStatListComponent } from './general-stat-list.component';

@NgModule({
  imports: [SharedModule],
  exports: [GeneralStatListComponent],
  declarations: [GeneralStatListComponent, GeneralStatListContentComponent]
})
export class GeneralStatListModule { }
