import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule, TuiGroupModule } from '@taiga-ui/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { QuotesBuyComponent } from './quotes-buy.component';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
  imports: [
    SharedModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    ReactiveFormsModule,
    TuiLetModule,
    TuiInputNumberModule,
    TuiGroupModule,
  ],
  exports: [QuotesBuyComponent],
  declarations: [QuotesBuyComponent]
})
export class QuotesBuyModule { }
