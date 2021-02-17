import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Activity } from 'src/app/models/activity-model';
import { Project } from 'src/app/models/project-model';
import { LoginService } from 'src/app/services/login.service';
import { StudentService } from 'src/app/services/student.service';
import { StudentActivityDataSource } from './student-activity-datasource';

@Component({
  selector: 'app-student-activity',
  templateUrl: './student-activity.component.html',
  styleUrls: ['./student-activity.component.css']
})
export class StudentActivityComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Activity>;
  dataSource: StudentActivityDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description','date'];
  public id: number;
  project:Project;
  activities:Activity[];
  team:String[];


  ngOnInit() {
    //get student proj id
    this.id = this.loginService.getStudent.project.id
        //get activity milestone of the project
        this.studentService.showProject(this.id).subscribe(data=>{
          console.log(JSON.stringify(data));
          this.activities = data.activities;
          this.team = data.students;
          this.dataSource = new StudentActivityDataSource(this.activities);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
          
        },error=>{
  
        })
   // this.dataSource = new StudentActivityDataSource();
  }

  ngAfterViewInit() {
    
  }

  constructor(private studentService: StudentService,private loginService: LoginService) {
    
  }
}
