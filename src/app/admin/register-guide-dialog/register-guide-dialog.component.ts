import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    dob: [null, [Validators.required]],
  });
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<RegisterGuideDialogComponent>) { }

  ngOnInit(): void {
  }

  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.regGuideForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }
 

  submitForm() {
    console.log(this.regGuideForm.value);
    //rest api submit form data and close form
    //this.dialogRef.close();
  }

}
