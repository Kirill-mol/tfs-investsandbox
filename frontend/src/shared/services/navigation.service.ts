import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IBackend, IBackendToken } from '../interfaces/IBackend';

@Injectable({providedIn: 'root'})
export class NavigationService {
  constructor(
    @Inject(IBackendToken) private backendService: IBackend,
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