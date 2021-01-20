import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AdminStudentsDataSource } from './admin-students-datasource';
//import { AdminStudentsDataSource, Student } from './admin-students-datasource';
import { MatDialog,MatDialogRef,MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UploadExcelDialogComponent } from '../upload-excel-dialog/upload-excel-dialog.component';
import { AdminService } from 'src/app/services/admin.service';
import { Student } from 'src/app/models/student-model';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements AfterViewInit, OnInit {
  studentData:Student[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Student>;
 
 dataSource: AdminStudentsDataSource;
  file: File;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['PRN', 'Name', 'Email', 'Phone'];
  errorMessage: any;
  constructor(public dialog: MatDialog,public adminService:AdminService) {}

  openDialog() {
    let dialogRef = this.dialog.open(UploadExcelDialogComponent, {  
      data: { file: this.file } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      this.file = result.file; 
      console.log("FILE HERE AGAIN:::::" + this.file);
    this.adminService.registerStudent(this.file).subscribe(
      (res) => {console.log("succesful" ,res);},
      (err) =>{ console.log("error ",err);}
    );
    });
  }

  ngOnInit() {
    this.adminService.getStudentList().subscribe({    
      next: data => {
        this.studentData = data;
        console.log(data);
      },
    error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
})
    this.dataSource = new AdminStudentsDataSource(this.studentData);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

