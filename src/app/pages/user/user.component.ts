import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../layouts/admin-layout/service/admin.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { TYPES, PRIORITY } from '../../shared/constants/fixed';
import { map, Observable, startWith } from 'rxjs';
@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
  mode: string = "show"
  details: any;
  formComplaint: FormGroup;
  TYPES = TYPES;
  STATUS: any[] = [];
  RAISED_BY: any[] = [];
  PRIORITY = PRIORITY;
  departmentId: string = "629df3990c6c6a7230a7630d"
  department: any[] = [];
  fildWorkers: any[] = [];
  staffWorker: any[] = [];
  show: boolean;
  filteredOptions: Observable<string[]>;
  originalDepartmentList: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserComponent>,
    private toastr: ToastrService) {
    this.mode = data.mode;
    this.details = data.details;

    if (this.details && this.details.aasm_state) {
      this.STATUS.push(this.details.aasm_state);
    }
    if (this.details && this.details.priority) {
      this.STATUS.push(this.details.priority);
    }
    if (this.details && this.details.permitted_events && this.details.permitted_events.length > 0) {
      this.details.permitted_events.forEach(element => {
        this.STATUS.push(element.event);
      })
    }
    if (this.details && this.details.resident_name) {
      this.RAISED_BY.push(this.details.resident_name);
    }
    console.log(this.data);
    this.createForm();
    this.adminService.getAllDepartments().subscribe(res => {
      console.log(res);
      if (res && res.data && res.data.departments) {
        this.department = res.data.departments;
        this.originalDepartmentList  = res.data.departments;
        this.checkDapartment(this.data.details.department_id);
      }
      this.show = true;
    })
  }

  checkDapartment(value) {
    let savedDepartment = this.department[0]
    if (this.department && this.department.length > 0) {
      this.department.forEach((element) => {
        if (element && element.id && (element.id === value)) {
          console.log("Found", element);
          savedDepartment = element
        }
      })
    }
    this.formComplaint.get('department').setValue(savedDepartment);
    if (savedDepartment.role_based_users && savedDepartment.role_based_users.dept_staff) {
      this.staffWorker = savedDepartment.role_based_users.dept_staff;
      this.fildWorkers = savedDepartment.role_based_users.field_worker;
      if (this.staffWorker && this.staffWorker.length > 0)
        this.formComplaint.get('staff').setValue(this.staffWorker[0]);
      else
        this.formComplaint.get('staff').setValue(null);
      if (this.fildWorkers && this.fildWorkers.length > 0)
        this.formComplaint.get('field_engineer').setValue(this.fildWorkers[0]);
      else
        this.formComplaint.get('field_engineer').setValue(null);
    }
    else {
      this.formComplaint.get('staff').setValue(null);
      this.formComplaint.get('field_engineer').setValue(null);
    }
  }

  ngOnInit() {
    // this.adminService.getStaffAndFieldWorker().subscribe(res => {
    //     console.log(res);
    // })
    // console.log('data',this.data); 
    // this.formComplaint.controls['input'].valueChanges.subscribe((value)=>{
    //   console.log("11",value)
    //   this.department = this._filter(value)
    // })
  }

  private _filter(value: any): string[] {
    const filterValue = (typeof(value)=='string')?value:value.name.toLowerCase();
    let arr = this.originalDepartmentList.filter((element)=>JSON.stringify(element.name).localeCompare(JSON.stringify(filterValue))==0)
    console.log("ARr",arr)
    return arr;
  }

  createForm() {
    this.formComplaint = this.formBuilder.group({
      project: [
        this.details?.unit_name ? this.details?.unit_name : null,
        [Validators.required, Validators.maxLength(50)],
      ],
      raised_by: [
        this.details?.resident_name ? this.details?.resident_name : null,
        [Validators.required, Validators.maxLength(50)],
      ],
      type: [
        this.details?.of_type ? this.details?.of_type : null,
        [Validators.required, Validators.maxLength(50)],
      ],
      department: [
        this.details?.department ? this.details?.department : this.department[0],
        [Validators.required, Validators.maxLength(50)],
      ],
      description: [
        this.details?.description ? this.details?.description : null,
        [Validators.required, Validators.maxLength(50)],
      ],
      priority: [
        this.details?.priority ? this.details?.priority : null,
        [Validators.required, Validators.maxLength(50)],
      ],
      status: [
        this.details?.aasm_state ? this.details?.aasm_state : null,
        [Validators.required, Validators.maxLength(50)],
      ],
      field_engineer: [
        this.details?.field_engineer ? this.details?.field_engineer : null,
        [Validators.required, Validators.maxLength(50)],
      ],
      staff: [
        this.details?.staff ? this.details?.staff : null,
        [Validators.required, Validators.maxLength(50)],
      ],
      reason: [
        this.details?.reason ? this.details?.reason : null,
        [Validators.required, Validators.maxLength(50)],
      ],
      input:['',[]]
    })
    console.log(this.formComplaint);
  }
  cancel() {
    this.dialogRef.close()
  }
  update() {
    this.adminService.updateById(this.formComplaint.value, this.data.details).subscribe((data) => {
      console.log(data);
      this.dialogRef.close({ "status": "success" })
    })
    // &complaint[of_type]=Request&complaint[unit_id]=62b5beab40427b8a9f70b3b9&complaint[resident_id]=62b5beab40427b8a9f70b3bd&complaint[category_id]=62b5beab40427b8a9f70b3c8&complaint[sub_category_id]=62b5beab40427b8a9f70b3d1&complaint[backend_worker_id]=62b5beab40427b8a9f70b3d3&complaint[field_worker_id]=62b5beab40427b8a9f70b3d6&complaint[department_id]=62b5beab40427b8a9f70b3de
  }

  getValue(event) {
    console.log(event.value.id);
    if (event && event.value && event.value.id)
      this.checkDapartment(event.value.id);
  }

  displayWith(department){  
    return (department && department.name)?department.name:null
  }

}

