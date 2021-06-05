import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWT_BEARER_REALM } from '@fullerstack/agx-dto';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { AuthEffectsService } from './store/auth-state.effect';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(readonly auth: AuthService, readonly effects: AuthEffectsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.state.token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `${JWT_BEARER_REALM} ${this.auth.state.token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error, caught$) => {
        if (error.status === 401) {
          return this.effects.tokenRefreshRequest().pipe(
            switchMap(() => {
              return next.handle(request);
            })
          );
        }
        return caught$;
      })
    );
  }
}