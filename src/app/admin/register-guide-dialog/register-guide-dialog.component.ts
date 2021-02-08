import { formatCurrency } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment';
import { Guide } from 'src/app/models/guide-model';
import { Technology } from 'src/app/models/technology-model';

import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-register-guide-dialog',
  templateUrl: './register-guide-dialog.component.html',
  styleUrls: ['./register-guide-dialog.component.css']
})
export class RegisterGuideDialogComponent implements OnInit {
  hide = true;
  minDate = new Date(new Date().getFullYear() - 70,1,1);//set min date 70 years back(1950)
  maxDate = new Date(this.minDate.getFullYear() + 50,1,1); // set max date 20 years back(2000)
  techList: Technology[] = [];/*['SpringBoot', 'Angular', 'MySQL', 'MS.NET', 'C++', 'ASDM'];*/
  techs: number[]=[];
  courses : string[]=[];
  technologies: string[] =[];

  regGuideForm = this.fb.group({
    fname: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(9)])],
    lname: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(9)])],
    email: [null, Validators.compose([
      Validators.required,Validators.email])],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(4), Validators.maxLength(9)])],
    phone: [null, Validators.compose([
        Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
    course: [''],
    dob: ['', [Validators.required]],
  });
  techGuideForm = this.fb.group({
    techs: [''],
  });
  errorMessage: any;
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<RegisterGuideDialogComponent>
              ,private adminservice:AdminService,private snackBar: MatSnackBar) { }
  guide: Guide;
  ngOnInit() {
    console.log((moment(this.minDate).format('yyyy-MM-DD')));
    console.log(this.maxDate);
    //rest api calls to get tech list and course list
     this.adminservice.getCourseList().subscribe({    
      next: (data: any[]) => {
        this.courses = data;
        console.log(data);

        
    },
    error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
})/*subscribe((data: any[])=>{
      console.log(data);
      this.courses = data;
    });*/

    this.adminservice.getTechnologyList().subscribe((data: any[])=>{
      console.log(data);
      this.techList = data;
    });

   

  }
  



  onCancel(): void { 
    this.dialogRef.close(); 
  }
 

  submitForm() {
    console.log("------INSIDE SUBMIT FORM--------");
    this.regGuideForm.setValue({
      'fname':this.regGuideForm.get('fname').value,
      'lname':this.regGuideForm.get('lname').value,
      'email':this.regGuideForm.get('email').value,
      'password':this.regGuideForm.get('password').value,
      'phone':this.regGuideForm.get('phone').value,
      'course':this.regGuideForm.get('course').value,
      'dob':moment(this.regGuideForm.get('dob').value).format('yyyy-MM-DD')
    });
    console.log(this.regGuideForm.value);
    console.log(this.techGuideForm.value);
    this.techGuideForm.get('techs').value.forEach(tech=>this.technologies.push(tech.toString()));
    console.log(this.technologies);
    //rest api submit form data and close form
    //submit as one user model and one string array(technology list)
    //this.dialogRef.close();
    var data =
    {
      "guidedata":{
          "firstName":this.regGuideForm.get('fname').value,
          "lastName":this.regGuideForm.get('lname').value,
          "email":this.regGuideForm.get('email').value,
          "password":this.regGuideForm.get('password').value,
          "phoneNumber":this.regGuideForm.get('phone').value,
          "dateOfBirth":this.regGuideForm.get('dob').value,
          "courseName":this.regGuideForm.get('course').value
      },
      "technologylist":this.technologies
    };
   
    console.log("----DATA BEFORE FUCN------"+data);
    //calling register guide service 
   return this.adminservice.registerGuide(data)
  .subscribe(data => {
    /*this.guide=data;*/
    console.log("register success",data);
    this.snackBar.open("Guide registered", 'Ok', {
      duration: 5000,
    });
     this.dialogRef.close();

    
  },
   error => console.log("error",error));
  
  }
  }

