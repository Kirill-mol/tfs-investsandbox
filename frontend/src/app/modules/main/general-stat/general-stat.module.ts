import { SharedModule } from './../../../../shared/modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiGroupModule } from '@taiga-ui/core';
import { TuiIslandModule, TuiRadioBlockModule } from '@taiga-ui/kit';
import { NgModule } from '@angular/core';

import { GeneralStatComponent } from './general-stat.component';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { GeneralStatListModule } from './general-stat-list/general-stat-list.module';

@NgModule({
  imports: [
    TuiIslandModule,
    TuiGroupModule,
    TuiRadioBlockModule,
    TuiMoneyModule,
    ReactiveFormsModule,
    SharedModule,
    GeneralStatListModule,
  ],
  exports: [GeneralStatComponent],
  declarations: [GeneralStatComponent],
})
export class GeneralStatModule {}
