import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from './profile.interface';
import { BASE_API_URL } from '../services.const';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  private http = inject(HttpClient);

  getTestAccounts(): Observable<IProfile[]> {
    return this.http.get<IProfile[]>(`${BASE_API_URL}/account/test_accounts`);
  }

  getMe(): Observable<IProfile> {
    return this.http.get<IProfile>(`${BASE_API_URL}/account/me`);
  }
}
