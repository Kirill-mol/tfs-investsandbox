import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { MainComponent } from './modules/main/main.component';
import { PortfolioComponent } from './modules/portfolio/portfolio.component';
import { AuthComponent } from './modules/auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login', component: AuthComponent
  },
  {
    path: 'portfolio/:title', component: PortfolioComponent
  },
  {
    path: 'main', component: MainComponent
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
