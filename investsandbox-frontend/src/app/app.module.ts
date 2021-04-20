import { CookiesService } from './../shared/services/cookies.service';
import { ICookiesToken } from './../shared/interfaces/ICookies';
import { BackendApiService } from './../shared/services/backendApi.service';
import { YahooApiMockService } from './../shared/services/yahooApiMock.service';
import { IYahooApiToken } from './../shared/interfaces/IYahooApi';
import { StatisticService } from './../shared/services/statistic.service';
import { IStatisticToken } from './../shared/interfaces/IStatistic';
import { IBackendApiToken } from './../shared/interfaces/IBackendApi';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { MainModule } from './modules/main/main.module';
import { TuiRootModule, TUI_ICONS_PATH, iconsPathFactory } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    TuiRootModule,
    RegistrationModule,
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
      provide: IBackendApiToken,
      useClass: BackendApiService
    }, 
    {
      provide: IStatisticToken,
      useClass: StatisticService
    },
    {
      provide: IYahooApiToken,
      useClass: YahooApiMockService
    },
    {
      provide: ICookiesToken,
      useClass: CookiesService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
