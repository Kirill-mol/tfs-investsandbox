import { UrlEnum } from '../models/url.model';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const XRapidApiKey = 'f3f6399e55msh30a0cb8f30dd00fp1fa72djsn81c1deaacd98';
const XRapidApiHost = 'apidojo-yahoo-finance-v1.p.rapidapi.com';

@Injectable()
export class AddYahooHeadersInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(UrlEnum.YAHOO)) {
      const headers = req.headers
        .set('x-rapidapi-key', XRapidApiKey)
        .set('x-rapidapi-host', XRapidApiHost)
        .set('useQueryString', 'true');
      const authReq = req.clone({ headers });

      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
