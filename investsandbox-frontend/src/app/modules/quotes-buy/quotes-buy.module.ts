import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule } from '@taiga-ui/core';
import { SharedModule } from './../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { QuotesBuyComponent } from './quotes-buy.component';
import { TuiComboBoxModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
  imports: [
    SharedModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    ReactiveFormsModule,
    TuiLetModule
  ],
  exports: [QuotesBuyComponent],
  declarations: [QuotesBuyComponent]
})
export class QuotesBuyModule { }
