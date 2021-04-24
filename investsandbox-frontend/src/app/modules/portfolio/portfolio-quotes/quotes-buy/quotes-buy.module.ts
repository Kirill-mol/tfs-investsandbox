import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule, TuiButtonModule, TuiGroupModule } from '@taiga-ui/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { QuotesBuyComponent } from './quotes-buy.component';
import { TuiComboBoxModule, TuiDataListWrapperModule, TuiInputNumberModule, TuiIslandModule } from '@taiga-ui/kit';
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
    TuiButtonModule,
    TuiIslandModule,
    TuiGroupModule
  ],
  exports: [QuotesBuyComponent],
  declarations: [QuotesBuyComponent]
})
export class QuotesBuyModule { }
