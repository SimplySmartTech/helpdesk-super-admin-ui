import { UserComponent } from './../user/user.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../layouts/admin-layout/service/admin.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['aasm_state', 'description', 'of_type', 'priority', 'resident_name', 'actions'];
  dataSource = new MatTableDataSource<any>(null);
  searchKey;
  page: number = 1;
  count: number = 15;
  totalData: any;
  isdataloaded: boolean;

  public pageSizeOptions = [15, 30, 50];
  public pageSize: number = 15;
  public pageIndex: 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  complaintsList
  mode: string;

  constructor(private adminService: AdminService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // this.adminService.complaintsListShowInTable$.subscribe((value) => {
    //   console.log('InSide...',value);
    //   if (value) {
    //   console.log('In IF CONDI',value.data.data.complaints);

    //     this.dataSource = new MatTableDataSource <any> (value.data.data.complaints); 
    //   } else {

    // console.log('In Esleeee CONDI',value.data.data.complaints);
    // }

    // });

    // this.adminService.complaintsListShowInTable$.subscribe((value) => {
    //   // console.log('Ithe value aahe', value);
    //   this.complaintsList = value;
    // });

    this.getAllCOmplaint();
  }

  getRowData(rowData) {
    this.mode = "show";
    this.getDetailsById(rowData);
  }

  showDetil(complaintDetail, event: Event) {
    event.stopPropagation();
    this.mode = "show";
    this.getDetailsById(complaintDetail)
  }

  getDetailsById(rowData) {
    this.adminService.getDetailsById(rowData.id)
      .subscribe((res) => {
        this.openDialog(res['data']['complaint'],rowData);
      })
  }

  openDialog(complaintDetail,otherDetails) {
    const dialogref = this.dialog.open(UserComponent, {
      data: {
        details: complaintDetail,
        mode: this.mode,
        otherDetails:otherDetails
      },
      height:"700px"
    });
    dialogref.afterClosed().subscribe((resp)=>{
      if(resp){
        this.isdataloaded = false;
        this.getAllCOmplaint();
      }
    })
  }


  editDetail(complaintDetail, event: Event) {
    event.stopPropagation();
    this.getDetailsById(complaintDetail)
    this.mode = "edit";
    // console.log(complaintDetail);
  }
  getAllCOmplaint() {
    // console.log("In get All complaint");
    this.adminService.getAllComplaints(this.page, this.count)
      .subscribe((res) => {
        if (res) {
          // console.log('Direct in table', res);
          this.complaintsList = res;
          this.totalData = res.data.total
          this.dataSource = new MatTableDataSource<any>(res.data.complaints); //pass the array you want in the table
          // console.log('res.data.complaints', res.data.complaints);
          // this.dataSource.paginator = this.paginator;
          this.isdataloaded = true;
          // console.log(this.page, this.totalData, this.count)
        }
        else {
          this.toastr.error('Something went wrong. Please refresh!');
        }
      }, error => {
        console.log(error);
        if(error && error.error && error.error.message)
          this.toastr.error(error.error.message,"Error");
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

  getPaginationData(event) {
    this.isdataloaded = false;
    this.page = event.pageIndex;
    this.count = event.pageSize;
    this.pageSize = event.pageSize;
    this.getAllCOmplaint();
  }
}
