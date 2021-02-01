import { Component,OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { StudentService } from 'src/app/services/student.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog,private studentService: StudentService,private loginService:LoginService) {}
  ngOnInit(): void {
    //get student data by using user id 
    console.log("---------INSIDE STUDENT INIT---------");
    console.log(this.loginService.studentDetails);
    //check whether project = null then openDialog()
    this.studentService.studentDetails= this.loginService.studentDetails;
    if(this.studentService.studentDetails.project!= null){
      console.log("----project exists---");
    }else{
      console.log("------no project show dialog --------");
      this.openDialog();
    }
    
  }
  openDialog() {
    console.log("inside choose proj open");
    let dialogRef = this.dialog.open(CreateProjectDialogComponent,{ disableClose: true }); 
  }
}
