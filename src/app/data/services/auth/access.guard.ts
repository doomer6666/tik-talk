import { inject } from '@angular/core';
import { Auth } from './auth';
import { Router } from '@angular/router';

export const canActivateAuth = () => {
  const authService = inject(Auth);
  if (authService.isAuth()) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};
