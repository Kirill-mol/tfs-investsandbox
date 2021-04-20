import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartDrawerComponent } from './chart-drawer.component';
import { TuiAxesModule, TuiLineChartModule } from '@taiga-ui/addon-charts';

@NgModule({
  imports: [TuiAxesModule, CommonModule, TuiLineChartModule],
  exports: [ChartDrawerComponent],
  declarations: [ChartDrawerComponent],
})
export class ChartDrawerModule {}
