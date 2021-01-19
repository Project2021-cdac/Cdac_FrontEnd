import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {
  createTaskForm = this.fb.group({
    description:['',Validators.compose([
      Validators.required, Validators.minLength(50), Validators.maxLength(300)])],
    milestone: ['',Validators.required]
  });
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<CreateTaskDialogComponent>) { }

  ngOnInit(): void {
    //get milestones names and ids from api 
  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }
 

  submitForm() {
    console.log(this.createTaskForm.value);
    //rest api submit form data and close form
    
    this.dialogRef.close();
  }
}
