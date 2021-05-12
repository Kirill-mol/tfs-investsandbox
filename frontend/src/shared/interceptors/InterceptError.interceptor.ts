import { IAuth, IAuthToken } from './../interfaces/IAuth';
import { NavigationService } from './../services/navigation.service';
import { UrlEnum } from '../models/url.model';
import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InterceptErrorInterceptor implements HttpInterceptor {
  constructor(
    private navigator: NavigationService,
    @Inject(IAuthToken) private authService: IAuth,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(UrlEnum.API)) {
      return next.handle(req).pipe(catchError(error => {
        if (error.status === 403 || error.status === 401) {
          this.navigator.toLogin();
          this.authService.logout();
        }
        return throwError(error);
      }));
    }
    return next.handle(req);
  }
}
