import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OWINIntercepter implements HttpInterceptor {

    constructor(
        // private userService: UserService       
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with OWIN token if available
        let tempArr = request.url.split("/");
        if (tempArr[tempArr.length - 2] == 'Master' && tempArr[tempArr.length - 1] == 'Get') { 
        }else {
            let auth_token = localStorage.getItem('auth_token');
            let api_key = localStorage.getItem('api_key');

            let headers = (auth_token) ? {
                Authorization: auth_token,  
                "x-api-key":api_key, 
                "content-type": "application/json",
                "Accept":"application/vnd.simplysmart.v1+json",
                // "Access-Control-Allow-Origin":'application/vnd.simplysmart.v1+json'
            } : {

                "content-type": "application/json",               
                "Accept":"application/vnd.simplysmart.v1+json",
                // "Access-Control-Allow-Origin":'application/vnd.simplysmart.v1+json'
            };
            request = request.clone({
                setHeaders: headers
            });
        }
        // const spinnerOverlayService = this.injector.get(SpinnerOverlayService);
        //const spinnerSubscription: Subscription = spinnerOverlayService.spinner$.subscribe();
        // request = request.clone({
        //     headers: new HttpHeaders({
        //       'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        //       'Pragma': 'no-cache',
        //       'Expires': '0'
        //     })
        //   });

        return next.handle(request);//.pipe(finalize(() => spinnerSubscription.unsubscribe()));
    }
}