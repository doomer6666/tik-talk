import { isPlatformBrowser } from '@angular/common';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Auth } from './auth';

export const authTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const platformId = inject(PLATFORM_ID);
  const authService = inject(Auth);
  if (isPlatformBrowser(platformId)) {
    const token = authService.token;
    if (token) {
      req = addToken(req, token);
    }
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        return authService.refresh().pipe(
          switchMap((data) => {
            authService.saveTokens(data.access_token, data.refresh_token);

            return next(addToken(req, data.access_token));
          }),

          catchError((refreshError) => {
            authService.logout();
            return throwError(() => refreshError);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};

const addToken = (req: HttpRequest<any>, token: string): HttpRequest<any> =>
  req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
