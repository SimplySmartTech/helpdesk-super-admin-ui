import { RootObject } from './../../layouts/admin-layout/models/complaints';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../layouts/admin-layout/service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public complaints: RootObject;
  public isdataloaded: boolean = false;

  constructor(private adminService: AdminService,
    private toastr: ToastrService,
    ){}

    ngOnInit(){
      this.adminService.getAllComplaints().subscribe( (res)=>{
        if (res){
        this.complaints = res;
        console.log('resss',res);
        this.adminService.setProduct(this.complaints)        
        this.isdataloaded = true;
        this.complaints.data.state_counts.resolved
      }
      else {
       this.toastr.error('Something went wrong. Please refresh!');
     }
   }, error => {
     console.log(error);     
     this.toastr.error("Network Error");
   });



  }
}
