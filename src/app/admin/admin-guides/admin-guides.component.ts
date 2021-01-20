import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Guide } from 'src/app/models/guide-model';
import { AdminService } from 'src/app/services/admin.service';
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
  guideData:GuideDummy[] = [{id:6546,firstName:"jhgjkjh"},{id:465,firstName:"jhgjhhgjh"},{id:65465,firstName:"jhgjh"}];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<GuideDummy>;
  dataSource: AdminGuidesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName'];
  constructor(public dialog: MatDialog,private adminService: AdminService) {}

  openDialog() {
    let dialogRef = this.dialog.open(RegisterGuideDialogComponent); 
  }

  ngOnInit() {
     //make api call to get data(--Rithika)
     this.adminService.getGuideList().subscribe((result)=>{    
     // this.guideData  =  result;
    });
    this.dataSource = new AdminGuidesDataSource(this.guideData);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
