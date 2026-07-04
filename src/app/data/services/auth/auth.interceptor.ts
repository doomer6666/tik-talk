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
    var token = localStorage.getItem('token');
    if (token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        return authService.refresh().pipe(
          switchMap((data) => {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('refreshToken', data.refresh_token);

            const cloneReq = req.clone({
              setHeaders: { Authorization: `Bearer ${data.access_token}` },
            });
            return next(cloneReq);
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
