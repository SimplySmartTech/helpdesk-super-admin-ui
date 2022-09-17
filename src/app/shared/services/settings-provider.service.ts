import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable()
export class SettingsProvider {
  private config: any;

  constructor(private http: HttpClient) {
  }

  public loadConfig(): Promise<any> {
    var date = new Date().getTime();

    return this.http.get("assets/appsettings.json?date=" + date)
      .pipe(map(res => res))
      .toPromise()
      .then(settings => this.config = settings);
  }

  public get configuration(): any {
    return this.config;
  }
}