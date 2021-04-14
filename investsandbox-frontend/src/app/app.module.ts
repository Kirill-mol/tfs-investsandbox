import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { MainModule } from './modules/main/main.module';
import { TuiRootModule, TUI_ICONS_PATH, iconsPathFactory } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    AppRoutingModule,
    RegistrationModule,
    MainModule,
    PortfolioModule
  ],
  providers: [
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/')
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
