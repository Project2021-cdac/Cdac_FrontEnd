import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';

interface Course {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register-guide-dialog',
  templateUrl: './register-guide-dialog.component.html',
  styleUrls: ['./register-guide-dialog.component.css']
})
export class RegisterGuideDialogComponent implements OnInit {
  hide = true;
  minDate = new Date(new Date().getFullYear() - 70,1,1);//set min date 70 years back(1950)
  maxDate = new Date(this.minDate.getFullYear() + 50,1,1); // set max date 20 years back(2000)
  techList: string[] = ['SpringBoot', 'Angular', 'MySQL', 'MS.NET', 'C++', 'ASDM'];
  techs: string[] =[];
  courses: Course[] = [
    {value: 'course-0', viewValue: 'DAC'},
    {value: 'course-1', viewValue: 'DBDA'},
    {value: 'course-2', viewValue: 'HPC'}
  ];
  regGuideForm = this.fb.group({
    fname: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(9)])],
    lname: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(9)])],
    email: [null, Validators.compose([
      Validators.required,Validators.email])],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(9)])],
    phone: [null, Validators.compose([
        Validators.required, Validators.minLength(12), Validators.maxLength(15)])],
    course: [''],
    techs: [this.techs],
    dob: [moment(), [Validators.required]],
  });
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<RegisterGuideDialogComponent>) { }

  ngOnInit(): void {
    //rest api calls to get tech list and course list
  }



  onCancel(): void { 
    this.dialogRef.close(); 
  }
 

  submitForm() {
    console.log(this.regGuideForm.value);
    //rest api submit form data and close form
    //submit as one user model and one string array(technology list)
    //this.dialogRef.close();
  }

}
