import { UrlEnum } from '../models/url.model';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const XMboumSecret = 'tjgMELCqt0MxbRVFzmtlrJgCXFjd2C3sNMAJHZUUut0iWicp8gj9pLqHHtlt';

@Injectable()
export class AddMboumHeadersInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(UrlEnum.MBOUM)) {
      const headers = req.headers
        .set('X-Mboum-Secret', XMboumSecret)
        .set('useQueryString', 'true');
      const authReq = req.clone({ headers });

      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
