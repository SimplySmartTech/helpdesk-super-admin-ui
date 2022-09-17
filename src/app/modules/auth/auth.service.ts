import { ApiService } from './../../shared/services/api.service';
import { map } from 'rxjs/operators';
import { API_CONFIG } from './../../shared/constants/rest-api.constants';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private restApi;

  constructor(private _http: HttpClient,
    private apiRequest: ApiService,
    @Inject(API_CONFIG) private endPoints: any) {
    this.restApi = endPoints;
}

// private _getHeaders():Headers {
//   let header = new Headers({
//     'Content-Type': 'application/json',
//     'Accept': 'application/vnd.simplysmart.v1+json'
//   });

//   return header;
// }

  login(loginModel): Observable<any> {
    return this.apiRequest.post(this.restApi.LOGIN, loginModel);
  }

  logoutUser(){
    localStorage.removeItem('api_key');
    localStorage.removeItem('auth_token');
  }


  isLoggedIn() {
    return (localStorage.getItem('api_key') && localStorage.getItem('auth_token')?true:false);
  }
}
