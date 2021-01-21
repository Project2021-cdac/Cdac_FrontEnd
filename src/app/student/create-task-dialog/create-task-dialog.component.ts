import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Milestone } from 'src/app/models/milestone-model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {
  studentId:number = 1234;
  milesList:Milestone[] = [
    {
      id:123,
      startDate:324234,
      endDate:34234234,
      milestoneCheckPoint:"Milestone 1",
      tasks:[]
    },
    {
      id:124,
      startDate:324234,
      endDate:34234234,
      milestoneCheckPoint:"Milestone 2",
      tasks:[]
    },
    {
      id:125,
      startDate:324234,
      endDate:34234234,
      milestoneCheckPoint:"Milestone 3",
      tasks:[]
    },
  ];
  createTaskForm = this.fb.group({
    description:['',Validators.compose([
      Validators.required, Validators.minLength(50), Validators.maxLength(300)])],
    milestone: ['',Validators.required]
  });
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
              private studentService:StudentService) { }

  ngOnInit(): void {
    //get milestones names and ids from api
    //this.studentService.getMilestone(pid/*project id*(how to get project id?*/).subscribe((data: any[])=>{
      //console.log(data);
      //this.milesList = data;
    //});

  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }
 

  submitForm() {
    
    const formData = this.fb.group({
      status:'CREATED',
      createdOn: moment().unix(),
      createdBy:this.studentId,
      description:this.createTaskForm.get('description').value,
      milestoneid:this.createTaskForm.get('milestone').value
    });
    console.log(formData.value);
    //rest api submit form data and close form
    this.studentService.createTask(formData.value).subscribe((data: any[])=>{
      console.log(data);
      //this.techList = data;
    }, error => console.log("error",error));
    this.dialogRef.close();
  }
}
