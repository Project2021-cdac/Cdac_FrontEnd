import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Guide } from 'src/app/models/guide-model';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';
import { RegisterGuideDialogComponent } from '../register-guide-dialog/register-guide-dialog.component';
import { AdminGuidesDataSource } from './admin-guides-datasource';

interface GuideDummy {
  id:number,
  firstName: string
}

@Component({
  selector: 'app-admin-guides',
  templateUrl: './admin-guides.component.html',
  styleUrls: ['./admin-guides.component.css']
})


export class AdminGuidesComponent implements AfterViewInit, OnInit {
  guideData:Guide[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<GuideDummy>;
  dataSource: AdminGuidesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['avatar','name','email','phone','tech'];
  constructor(public dialog: MatDialog,private adminService: AdminService,private loginService: LoginService) {}

  openDialog() {
    let dialogRef = this.dialog.open(RegisterGuideDialogComponent); 
    dialogRef.afterClosed().subscribe(result => { 
      
      console.log("Guide registered refreshing..list");
      this.ngOnInit();
   
    });
  }

  ngOnInit() {
    
     //make api call to get data(--Rithika)
     this.adminService.getGuideList(this.loginService.currentUserValue.courseName).subscribe((result)=>{    
      if(result){
      this.guideData  =  result;
      console.log("-------Getting Guide Data --------");
      console.log(result);
      }
      this.dataSource = new AdminGuidesDataSource(this.guideData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  
  }

  ngAfterViewInit() {
    
  }

}
