import { SharedModule } from './../../../../shared/modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { NgModule } from '@angular/core';

import { PortfoliosAddComponent } from './portfolios-add.component';
import { TuiDataListModule, TuiGroupModule } from '@taiga-ui/core';

@NgModule({
  imports: [
    SharedModule,
    TuiGroupModule,
    TuiInputNumberModule,
    TuiInputModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiDataListModule,
    ReactiveFormsModule,
  ],
  exports: [PortfoliosAddComponent],
  declarations: [PortfoliosAddComponent],
  providers: [],
})
export class PortfoliosAddModule {}
