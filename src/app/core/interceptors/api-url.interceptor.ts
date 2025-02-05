import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isRelativeUrl = !req.url.startsWith('http');

    const apiReq = isRelativeUrl
      ? req.clone({url: `${environment.apiUrl}${req.url}`})
      : req;

    return next.handle(apiReq);
  }
}
