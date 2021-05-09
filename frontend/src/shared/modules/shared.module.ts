import { ConvertCurrencyPipe } from './../pipes/convertCurrency.pipe';
import { InputPasswordDirective } from './../directives/inputPassword.directive';
import { ChartDrawerModule } from './../../app/modules/chart-drawer/chart-drawer.module';
import { PercentModule } from './../../app/modules/percent/percent.module';
import { FormatAbbreviatureCurrencyPipe } from './../pipes/formatAbbreviatureCurrency.pipe';
import { CommonModule, DecimalPipe } from '@angular/common';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { NgModule } from '@angular/core';
import { TuiFormatNumberPipeModule } from '@taiga-ui/core';

@NgModule({
  imports: [CommonModule],
  exports: [
    TuiCurrencyPipeModule,
    TuiFormatNumberPipeModule,
    CommonModule,
    FormatAbbreviatureCurrencyPipe,
    ConvertCurrencyPipe,
    DecimalPipe,
    PercentModule,
    ChartDrawerModule,
    InputPasswordDirective
  ],
  declarations: [FormatAbbreviatureCurrencyPipe, ConvertCurrencyPipe, InputPasswordDirective]
})
export class SharedModule {}
