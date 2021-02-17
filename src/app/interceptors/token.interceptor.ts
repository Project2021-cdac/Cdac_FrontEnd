import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth-guard.service';
import 'rxjs/add/operator/do';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth:AuthGuardService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      console.log(this.auth.getToken());
      request = request.clone({
      setHeaders: {
        "Authorization": `Bearer ${this.auth.getToken()}`,
        "Access-Control-Allow-Origin": '*'
      }
    });
    //return next.handle(request);
    const started = Date.now();

    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => {
       if (event instanceof HttpResponse) {
        const elapsed = Date.now() - started;
        console.log(`Request for ${request.urlWithParams} took ${elapsed} ms.`);
          }
       }, 
      (err: any) => {
      if (err instanceof HttpErrorResponse){
        const elapsed = Date.now() - started;
        console.log(`Request for ${request.urlWithParams} failed after ${elapsed} ms.`);
      }
    }));
  }
}
