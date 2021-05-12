import { SharedModule } from 'src/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { QuotesItemComponent } from './quotes-item.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [QuotesItemComponent],
  declarations: [QuotesItemComponent]
})
export class QuotesItemModule { }
