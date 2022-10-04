import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsProvider } from './settings-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private settingsProvider: SettingsProvider) {
  }

  put<T>(action: string, body?: any, options?: Object): Observable<T> {
    return this.http.put<T>(this.getAPIPath(action), body, options);
  }

  post<T>(action: string, body?: any, options?: Object): Observable<T> {
    return this.http.post<T>(this.getAPIPath(action), body, options);
  }

  get<T>(action: string, options?: Object): Observable<T> {
    return this.http.get<T>(this.getAPIPath(action), options);
  }

  getForDummy<T>(action: string, options?: Object): Observable<T> {
    return this.http.get<T>(this.getAPIPathDummy(action), options);
  }

  private getAPIPathDummy(action: string): string {
    return `${action}`;
  }

  private getAPIPath(action: string): string {
    return `${this.settingsProvider.configuration.apiEndpoint}/${action}`;
  }
}
