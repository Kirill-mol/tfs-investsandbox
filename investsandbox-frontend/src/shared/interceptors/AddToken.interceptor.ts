import { UrlEnum } from './../models/url.model';
import { NavigationService } from './../services/navigation.service';
import { IAuth, IAuthToken } from './../interfaces/IAuth';
import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddTokenInterceptor implements HttpInterceptor {
  constructor(
    @Inject(IAuthToken) private authService: IAuth,
    private navigationService: NavigationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === UrlEnum.ACCOUNT || req.url === UrlEnum.PORTFOLIO) {
      const token = this.authService.getTokenValue();
      if (token) {
        const headers = req.headers.set('Authorization', token);
        const authReq = req.clone({ headers });

        return next.handle(authReq);
      }

      this.navigationService.toLogin();
    }

    return next.handle(req);
  }
}
