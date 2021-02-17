import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { mileStones,tasks } from './example-data';
import { Task } from 'src/app/models/task-model';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { StudentService } from 'src/app/services/student.service';
import { LoginService } from 'src/app/services/login.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-student-tasks',
  templateUrl: './student-tasks.component.html',
  styleUrls: ['./student-tasks.component.css']
})
export class StudentTasksComponent implements OnInit{
  tasksList:Task[] = [];
  grouped
  displayedColumns: string[] = ['description', 'status', 'createdOn'];
  dataSource = new MatTableDataSource<Task>();


  constructor(public dialog: MatDialog,private studentService : StudentService,private loginService: LoginService,private snackBar: MatSnackBar) {
    
  }

  ngOnInit(): void {
    //get tasks for userid
    this.studentService.getStudentsTasks(this.loginService.getStudent.prn).subscribe(data=>{
      console.log(data);
      this.tasksList = data;
    });
    //get all milestones for projid
    this.studentService.getMilestoneForAllUser(this.loginService.getStudent.project.id).subscribe(data=>{
      console.log(data);
      this.grouped = groupBy(data, task => task.milestone.title);
      console.log(String(this.grouped));
    });
    
    
  }
  

  
  /* Check status string for input in checkbox*/
  statusCheck(status: String):boolean{
    return status=="COMPLETED"? true:false;
  }

  addData(data: any){
    this.dataSource = new MatTableDataSource(data);
  }
  /* Trigger task complete */
  endTask(event:MatCheckboxChange,tid:number): void {
    console.log(event.checked);
    this.studentService.endTask(tid).subscribe(data => {
    
      console.log("task ended",data);
      this.snackBar.open("Task completed successfully", 'Ok', {
        duration: 5000,
        });
      this.ngOnInit();
    },
     error => console.log("error",error));
}
  /* Add task open dialog*/
  openDialog(){
    console.log("inside create tasks dialog open");
    let dialogRef = this.dialog.open(CreateTaskDialogComponent); 
    dialogRef.afterClosed().subscribe(result => { 
      console.log("size changed getting team size");
      this.ngOnInit();
    });
  }
}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}