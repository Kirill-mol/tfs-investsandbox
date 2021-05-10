import { NavigationService } from './../services/navigation.service';
import { UrlEnum } from '../models/url.model';
import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InterceptErrorInterceptor implements HttpInterceptor {
  constructor(
    private navigator: NavigationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(UrlEnum.API)) {
      return next.handle(req).pipe(catchError(error => {
        if (error.status === 403 || error.status === 401) {
          this.navigator.toLogin();
        }
        return of(error);
      }));
    }
    return next.handle(req);
  }
}
