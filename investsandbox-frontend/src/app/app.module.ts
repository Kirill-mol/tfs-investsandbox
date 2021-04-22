import { YahooService } from './../shared/services/yahoo.service';
import { AddTokenInterceptor } from './../shared/interceptors/AddToken.interceptor';
import { AuthService } from './../shared/services/auth.service';
import { IAuthToken } from './../shared/interfaces/IAuth';
import { BackendService } from './../shared/services/backend.service';
import { BackendApiService } from './../shared/services/backendApi.service';
import { YahooApiMockService } from './../shared/services/yahooApiMock.service';
import { IYahooApiToken } from './../shared/interfaces/IYahooApi';
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
import { IYahooToken } from 'src/shared/interfaces/IYahoo';

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
      provide: IStatisticToken,
      useClass: StatisticService
    },
    {
      provide: IYahooToken,
      useClass: YahooService
    },
    {
      provide: IYahooApiToken,
      useClass: YahooApiMockService
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
