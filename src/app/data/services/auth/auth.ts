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
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_KEY = 'refreshToken';

  private http = inject(HttpClient);
  private router = inject(Router);

  login(payload: { username: string; password: string }): Observable<IAuth> {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<IAuth>(`${BASE_API_URL}/auth/token`, fd);
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  refresh(): Observable<IAuth> {
    return this.http.post<IAuth>(`${BASE_API_URL}/auth/refresh`, {
      refresh_token: localStorage.getItem('refreshToken'),
    });
  }

  logout(): void {
    this.clearTokens();
    this.router.navigate(['/login']);
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_KEY, refreshToken);
  }

  clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
  }
}
