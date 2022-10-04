import { RootObject } from './../models/complaints';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
  getAllComplaints(page, count): any {
    return this.Api.get(this.restApi.GETALL_COMPLAINTS + "page=" + page + "&count=" + count)
      .pipe(map(data => {
        return data;
      }));
  }

  getAllDepartments(): Observable<any> {
    return this.Api.get(this.restApi.GET_DEPARTMENTS);
  }

  getDetailsById(id) {
    return this.Api.get(this.restApi.SHOW_COMPLENT + id)
      .pipe(map(data => {
        return data;
      }));
  }

  getStaffAndFieldWorker() {
    return this.Api.get(this.restApi.STAFF_AND_FIELD)
      .pipe(map(data => {
        return data;
      }));
  }
  updateById(value, details) {
    console.log("Status",details.aasm_state);
    console.log("Status",value.status);

    let compObj = {
      'complaint': {
        "description": value?.description,
        "resolved_reason": (JSON.stringify(value.status).toLowerCase()).localeCompare('resolved')?(value?.reason):null,
        "rejected_reason": (JSON.stringify(value.status).toLowerCase()).localeCompare('rejected')?(value?.reason):null,
        "blocked_reason": (JSON.stringify(value.status).toLowerCase()).localeCompare('blocked')?(value?.reason):null,
        "started_reason":(JSON.stringify(value.status).toLowerCase()).localeCompare('started')?(value?.reason):null,
        "field_worker_id": value?.field_engineer?.id,
        "backend_worker_id": value?.staff?.id,
        "department_id": value?.department?.id,
        "priority": value?.priority,
        "of_type": value?.type,
        "unit_id": details?.unit?.id,
        "resident_id": details?.unit?.id
      }
      // "complaint": {
      //   "description":"reading not updating properly", 
      //   "resolved_reason":"", 
      //   "rejected_reason":"", 
      //   "blocked_reason":"", 
      //   "started_reason":"", 
      //   "field_worker_id": "628e383b0c6c6a2cc6d5e94b", 
      //   "backend_worker_id":"", 
      //   "department_id": "628e37730c6c6a402fe3e4c6", 
      //   "priority":"Regular", 
      //   "of_type":"Complaint", 
      //   "unit_id":"6267b7ef0c6c6a106adfbe93", 
      //   "resident_id":"6267b7ef0c6c6a106adfbe93"
      // } 
    }
    return this.Api.put(this.restApi.UPDATE_BY_ID + details?.id + "?subdomain=" + details?.company?.subdomain + "&&site_id=" + details?.site_id, compObj)
      .pipe(map(data => {
        return data;
      }));
  }

}