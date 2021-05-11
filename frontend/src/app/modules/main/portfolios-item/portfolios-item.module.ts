import { SharedModule } from './../../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';

import { PortfoliosItemComponent } from './portfolios-item.component';

@NgModule({
  imports: [SharedModule],
  exports: [PortfoliosItemComponent],
  declarations: [PortfoliosItemComponent],
  providers: [],
})
export class PortfoliosItemModule { }

