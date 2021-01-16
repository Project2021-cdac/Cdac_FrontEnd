import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
//import { SelectAutocompleteComponent } from 'mat-select-autocomplete-angular9';
import * as moment from 'moment';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit {
  minsDate = new Date();//set start date today
  maxsDate = new Date(this.minsDate.getDate() + 15); // set max start date 15 days from now 
  mineDate = new Date(this.minsDate.getDate() + 16);//set end date 16 days from now
  maxeDate = new Date(this.minsDate.getDate() + 60); // set max edate 60 days from now
  techList: string[] = ['SpringBoot', 'Angular', 'MySQL', 'MS.NET', 'C++', 'ASDM'];
  techs: string[] =[];
  studentsList: number[] = [ 200240120078,200240120088,200240120098,200240120068,200240120058,200240120048];
  team: number[]=[];

  createProjectForm = this.fb.group({
    t_lead:[0,[Validators.required]],
    title:['',Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
    description:['',Validators.compose([
      Validators.required, Validators.minLength(50), Validators.maxLength(300)])],
    stime: [moment().unix(), [Validators.required]],
    etime: [moment().unix(), [Validators.required]],
    //team: [this.team],
    techs: [this.techs]
  });
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<CreateProjectDialogComponent>) { }

  ngOnInit(): void {
  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }
 

  submitForm() {
    console.log(this.createProjectForm.value);
    //rest api submit form data and close form
    //this.dialogRef.close();
  }
  

}
