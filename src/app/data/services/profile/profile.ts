import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProfile } from './profile.interface';
import { BASE_API_URL } from '../services.const';

const PROFILE_API_URL = `${BASE_API_URL}/account`;
@Injectable({
  providedIn: 'root',
})
export class Profile {
  private http = inject(HttpClient);
  getTestAccounts(): Observable<IProfile[]> {
    return this.http.get<IProfile[]>(`${PROFILE_API_URL}/test_accounts`);
  }

  getMe(): Observable<IProfile> {
    return this.http.get<IProfile>(`${PROFILE_API_URL}/me`);
  }

  getSubscriptions(): Observable<IProfile[]> {
    return this.http.get<IProfile[]>(`${PROFILE_API_URL}/subscriptions`);
  }

  getSubscribers(): Observable<IProfile[]> {
    return this.http
      .get<{ items: IProfile[] }>(`${PROFILE_API_URL}/subscribers/?page=1&size=50`)
      .pipe(map((res) => res.items));
  }
}
