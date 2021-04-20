import { SharedModule } from './../../../../shared/modules/shared.module';
import { PortfoliosItemModule } from './../portfolios-item/portfolios-item.module';
import { TuiButtonModule } from '@taiga-ui/core';
import { PortfoliosAddModule } from './../portfolios-add/portfolios-add.module';
import { NgModule } from '@angular/core';

import { PortfoliosListComponent } from './portfolios-list.component';

@NgModule({
  imports: [
    PortfoliosAddModule,
    PortfoliosItemModule,
    TuiButtonModule,
    SharedModule,
  ],
  exports: [PortfoliosListComponent],
  declarations: [PortfoliosListComponent],
})
export class PortfoliosListModule {}
