import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Milestone } from 'src/app/models/milestone-model';
import { LoginService } from 'src/app/services/login.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {
  studentId:number;
  projId:number;
  milesList:Milestone[] = [];
  createTaskForm = this.fb.group({
    description:['',Validators.compose([
      Validators.required, Validators.minLength(10), Validators.maxLength(300)])],
    milestone: ['',Validators.required]
  });
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
              private studentService:StudentService ,private loginService:LoginService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.studentId = this.loginService.getStudent.prn;
    this.projId = this.loginService.getStudent.project.id;
    //get milestones names and ids from api
    this.studentService.getMilestone().subscribe((data: any[])=>{
      console.log("inside get Milestone  ",data);
      this.milesList = data;
    });

  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }
 

  submitForm() {
    
    const formData = this.fb.group({
      status:"STARTED",
      description:this.createTaskForm.get('description').value,
      milestone:this.createTaskForm.get('milestone').value
    });
    console.log(formData.value);
    //rest api submit form data and close form
    this.studentService.createTask(formData.value,this.projId,this.studentId).subscribe((data: any[])=>{
      console.log(data);
      this.snackBar.open("Task created successfully", 'Ok', {
        duration: 5000,
        });
        this.dialogRef.close();
      //this.techList = data;
    }, error => console.log("error",error));
    
  }
}
