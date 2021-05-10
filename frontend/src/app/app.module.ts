import { ForexService } from './../shared/services/forex.service';
import { IForexToken } from './../shared/interfaces/IForex';
import { CalculateService } from './../shared/services/calculate.service';
import { ICalculateToken } from './../shared/interfaces/ICalculate';
import { StockMarketApiService } from '../shared/services/stockMarketApi.service';
import { StockMarketService } from '../shared/services/stockMarket.service';
import { AddTokenInterceptor } from './../shared/interceptors/AddToken.interceptor';
import { AuthService } from './../shared/services/auth.service';
import { IAuthToken } from './../shared/interfaces/IAuth';
import { BackendService } from './../shared/services/backend.service';
import { BackendApiService } from './../shared/services/backendApi.service';
import { IStockMarketApiToken } from '../shared/interfaces/IStockMarketApi';
import { StatisticService } from './../shared/services/statistic.service';
import { IStatisticToken } from './../shared/interfaces/IStatistic';
import { IBackendApiToken } from './../shared/interfaces/IBackendApi';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { AuthModule } from './modules/auth/auth.module';
import { MainModule } from './modules/main/main.module';
import { TuiRootModule, TUI_ICONS_PATH, iconsPathFactory } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IBackendToken } from 'src/shared/interfaces/IBackend';
import { IStockMarketToken } from 'src/shared/interfaces/IStockMarket';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    TuiRootModule,
    AuthModule,
    MainModule,
    PortfolioModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/')
    },
    {
      provide: IBackendToken,
      useClass: BackendService
    },
    {
      provide: IBackendApiToken,
      useClass: BackendApiService
    },
    {
      provide: IStockMarketToken,
      useClass: StockMarketService
    },
    {
      provide: IStockMarketApiToken,
      useClass: StockMarketApiService
    },
    {
      provide: IForexToken,
      useClass: ForexService
    },
    {
      provide: ICalculateToken,
      useClass: CalculateService
    },
    {
      provide: IStatisticToken,
      useClass: StatisticService
    },
    {
      provide: IAuthToken,
      useClass: AuthService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
