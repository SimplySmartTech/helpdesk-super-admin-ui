import { RootObject } from './../models/complaints';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './../../../shared/services/api.service';
import { API_CONFIG } from './../../../shared/constants/rest-api.constants';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private restApi;
  private complaintsList$ = new BehaviorSubject<any>({});
  complaintsListShowInTable$ = this.complaintsList$.asObservable();



  constructor(@Inject(API_CONFIG) private endPoints: any, private Api: ApiService) {
    this.restApi = endPoints;
  }

  setProduct(product: any) {
    this.complaintsList$.next(product);
  }
  // To get GETALL COMPLAINTS
  getAllComplaints(): Observable<RootObject> {
    return this.Api.get(this.restApi.GETALL_COMPLAINTS);
  }

}