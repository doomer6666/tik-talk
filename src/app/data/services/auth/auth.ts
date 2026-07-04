import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuth } from './auth.interface';
import { BASE_API_URL } from '../services.const';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);

  login(payload: { username: string; password: string }): Observable<IAuth> {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<IAuth>(`${BASE_API_URL}/auth/token`, fd);
  }

  isAuth(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  refresh(): Observable<IAuth> {
    return this.http.post<IAuth>(`${BASE_API_URL}/auth/refresh`, {
      refresh_token: localStorage.getItem('refreshToken'),
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }
}
