import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth:AuthGuardService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    request = request.clone({
      setHeaders: {
        "Authorization": `Bearer ${this.auth.getToken()}`,
        "Access-Control-Allow-Origin": '*'
      }
    });
    return next.handle(request);
 
  }
}
