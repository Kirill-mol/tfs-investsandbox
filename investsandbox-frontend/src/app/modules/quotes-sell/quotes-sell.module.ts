import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { QuotesSellComponent } from './quotes-sell.component';
import { TuiInputNumberModule } from '@taiga-ui/kit';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    TuiInputNumberModule,
    TuiButtonModule,
    TuiTextfieldControllerModule
  ],
  exports: [QuotesSellComponent],
  declarations: [QuotesSellComponent]
})
export class QuotesSellModule { }
