import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { QuotesSellComponent } from './quotes-sell.component';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { SharedModule } from 'src/shared/modules/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule
  ],
  exports: [QuotesSellComponent],
  declarations: [QuotesSellComponent]
})
export class QuotesSellModule { }
