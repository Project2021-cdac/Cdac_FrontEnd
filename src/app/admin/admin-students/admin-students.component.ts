import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AdminStudentsDataSource, AdminStudentsItem } from './admin-students-datasource';
import { MatDialog,MatDialogRef,MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UploadExcelDialogComponent } from '../upload-excel-dialog/upload-excel-dialog.component';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AdminStudentsItem>;
  dataSource: AdminStudentsDataSource;
  file: File;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['PRN', 'Name', 'Email', 'Phone'];
  constructor(public dialog: MatDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(UploadExcelDialogComponent, {  
      data: { file: this.file } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.file = result.file; 
      //call api to upload here
      /*const formData = new FormData();
    formData.append('file', this.file);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );*/
    });
  }

  ngOnInit() {
    this.dataSource = new AdminStudentsDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

