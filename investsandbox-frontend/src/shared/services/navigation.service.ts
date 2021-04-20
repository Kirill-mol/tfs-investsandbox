import { IBackendApi, IBackendApiToken } from '../interfaces/IBackendApi';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class NavigationService {
  constructor(
    @Inject(IBackendApiToken) private backendService: IBackendApi,
    private router: Router
  ) {}

  toLogin() {
    this.router.navigate(['/login']);
  }

  toMain() {
    this.router.navigate(['/main']);
  }
  
  toPortfolio(title: string) {
    if (this.backendService.portfolioExists(title)) {
      this.router.navigate([`/portfolio/${title}`]);
    } else {
      this.toMain();
    }
  }
}