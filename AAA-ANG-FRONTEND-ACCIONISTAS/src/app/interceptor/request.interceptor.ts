import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RefreshTokenService } from '../services/refreshToken/refreshToken.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private refreshToken: RefreshTokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {

        if (event instanceof HttpResponse) {
          const token = event.headers.get('Authorization');

          if(token){
            localStorage.setItem('token', JSON.stringify(token));
          }
        }

      })
    );
  }



}
