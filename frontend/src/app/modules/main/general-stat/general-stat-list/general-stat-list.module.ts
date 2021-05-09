import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiIslandModule } from '@taiga-ui/kit';
import { SharedModule } from './../../../../../shared/modules/shared.module';
import { GeneralStatListContentComponent } from './general-stat-list-content/general-stat-list-content.component';
import { NgModule } from '@angular/core';

import { GeneralStatListComponent } from './general-stat-list.component';

@NgModule({
  imports: [SharedModule, TuiIslandModule, TuiMoneyModule],
  exports: [GeneralStatListComponent],
  declarations: [GeneralStatListComponent, GeneralStatListContentComponent]
})
export class GeneralStatListModule { }
