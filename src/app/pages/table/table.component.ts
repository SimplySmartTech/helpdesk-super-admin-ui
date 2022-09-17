import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../layouts/admin-layout/service/admin.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['aasm_state', 'description', 'of_type', 'priority','resident_name'];
  dataSource = new MatTableDataSource <any> (null);

  isdataloaded
  searchKey

  @ViewChild(MatPaginator) paginator: MatPaginator;
  complaintsList

  constructor(private adminService: AdminService,
    private toastr: ToastrService,
    ){}

  ngOnInit(){
    debugger;

    // this.adminService.complaintsListShowInTable$.subscribe((value) => {
    //   console.log('InSide...',value);
    //   if (value) {
    //   console.log('In IF CONDI',value.data.data.complaints);

    //     this.dataSource = new MatTableDataSource <any> (value.data.data.complaints); 
    //   } else {

      // console.log('In Esleeee CONDI',value.data.data.complaints);

        this.adminService.getAllComplaints().subscribe( (res)=>{
          if (res){
          console.log('Direct in table',res);
            
          this.complaintsList = res;
          this.dataSource = new MatTableDataSource <any> (res.data.complaints); //pass the array you want in the table
          console.log('res.data.complaints',res.data.complaints);
          this.dataSource.paginator = this.paginator;          
          this.isdataloaded = true;
        }
        else {
         this.toastr.error('Something went wrong. Please refresh!');
       }
     }, error => {
       console.log(error);     
       this.toastr.error("Network Error");
     });
    // }
      
    // });

    this.adminService.complaintsListShowInTable$.subscribe((value) => {
      console.log('Ithe value aahe',value);      
      this.complaintsList = value;
    });
  }
  
  ngAfterViewInit() {
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
