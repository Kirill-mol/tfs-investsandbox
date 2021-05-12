import { TuiIslandModule } from '@taiga-ui/kit';
import { LogoModule } from './logo/logo.module';
import { ConvertCurrencyPipe } from './../pipes/convertCurrency.pipe';
import { InputPasswordDirective } from './../directives/inputPassword.directive';
import { ChartDrawerModule } from './chart-drawer/chart-drawer.module';
import { PercentModule } from './percent/percent.module';
import { CommonModule, DecimalPipe } from '@angular/common';
import { TuiCurrencyPipeModule, TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { NgModule } from '@angular/core';
import { TuiFormatNumberPipeModule, TuiLinkModule, TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  imports: [CommonModule],
  exports: [
    TuiCurrencyPipeModule,
    TuiFormatNumberPipeModule,
    TuiLinkModule,
    TuiButtonModule,
    TuiIslandModule,
    TuiMoneyModule,
    CommonModule,
    PercentModule,
    ChartDrawerModule,
    PercentModule,
    LogoModule,
    ConvertCurrencyPipe,
    DecimalPipe,
    InputPasswordDirective
  ],
  declarations: [ConvertCurrencyPipe, InputPasswordDirective]
})
export class SharedModule {}
