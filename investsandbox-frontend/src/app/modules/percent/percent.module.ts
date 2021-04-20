import { CommonModule } from '@angular/common';
import { TuiFormatNumberPipeModule } from '@taiga-ui/core';
import { NgModule } from '@angular/core';

import { PercentComponent } from './percent.component';

@NgModule({
  imports: [TuiFormatNumberPipeModule, CommonModule],
  exports: [PercentComponent],
  declarations: [PercentComponent],
  providers: [],
})
export class PercentModule { }
