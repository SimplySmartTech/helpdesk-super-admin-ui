import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../layouts/admin-layout/service/admin.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{

    constructor(@Inject(MAT_DIALOG_DATA) public data,
    private adminService: AdminService,
    private toastr: ToastrService){
    }

    ngOnInit(){
        this.adminService.getAllDepartments().subscribe(res=>{
            console.log(res);
        })
        // console.log('data',this.data);        
    }

}

