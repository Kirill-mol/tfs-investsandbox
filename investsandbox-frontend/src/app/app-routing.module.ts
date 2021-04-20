import { MainComponent } from './modules/main/main.component';
import { PortfolioComponent } from './modules/portfolio/portfolio.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login', component: RegistrationComponent
  },
  {
    path: 'portfolio/:title', component: PortfolioComponent
  },
  {
    path: 'main', component: MainComponent
  },
  {
    path: '**', redirectTo: '/main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
