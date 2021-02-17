import { Component,OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { StudentService } from 'src/app/services/student.service';
import { LoginService } from 'src/app/services/login.service';
import * as moment from 'moment';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit{
  projectData;
  progress;
  daysOver;
  daysLeft;
  startM
  endM
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Description', cols: 1, rows: 1 },
          { title: 'Timeline', cols: 1, rows: 1 },
          { title: 'Technology', cols: 1, rows: 1 },
          { title: 'Guide', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Description', cols: 2, rows: 1 },
        { title: 'Timeline', cols: 1, rows: 1 },
        { title: 'Technology', cols: 1, rows: 2 },
        { title: 'Guide', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog,private studentService: StudentService,private loginService:LoginService) {}
  ngOnInit(): void {
    //get student data by using user id 
    console.log("---------INSIDE STUDENT INIT---------");
    console.log(this.loginService.studentDetails);
    //check whether project = null then openDialog()
    this.studentService.studentDetails= this.loginService.getStudent;
    this.projectData = this.loginService.getStudent.project;
    if(this.studentService.studentDetails.project!= null){
      console.log("----project exists---");
      this.calculateProgress();
      this.startM = moment(this.projectData.startDate,'yyyy-MM-DD').format('ddd, MMM Do YYYY');
      this.endM = moment(this.projectData.endDate,'yyyy-MM-DD').format('ddd, MMM Do YYYY');
    }else{
      console.log("------no project show dialog --------");
      this.openDialog();
    }
    
  }

  openDialog() {
    console.log("inside choose proj open");
    let dialogRef = this.dialog.open(CreateProjectDialogComponent,{ disableClose: true }); 
    dialogRef.afterClosed().subscribe(result => { 
    
    });
  }

  calculateProgress() {
    console.log("inside calculate project progresss" + JSON.stringify(this.projectData));
    var startDate = moment(this.projectData.startDate, "yyyy-MM-DD");
    var endDate = moment(this.projectData.endDate, "yyyy-MM-DD");
    var nowDate = moment();
    var daysTotal = endDate.diff(startDate, 'days');
    console.log("project progress is "+ daysTotal);
    this.daysOver = nowDate.diff(startDate, 'days');
    this.daysLeft = endDate.diff(nowDate, 'days');
    console.log("project progress is "+ this.daysOver);
    this.progress = 100 - ((daysTotal-this.daysOver)/daysTotal * 100)
    console.log("project progress is "+ this.progress);

  }
}
