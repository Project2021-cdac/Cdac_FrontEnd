import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
//import { SelectAutocompleteComponent } from 'mat-select-autocomplete-angular9';
import * as moment from 'moment';
import { Project } from 'src/app/models/project-model';
import { Student } from 'src/app/models/student-model';
import { AdminService } from 'src/app/services/admin.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit {
  minsDate = new Date();//set start date today
  maxsDate = new Date(this.minsDate.getFullYear(),this.minsDate.getMonth(),this.minsDate.getDate() + 15); // set max start date 15 days from now 
  mineDate = new Date(this.minsDate.getFullYear(),this.minsDate.getMonth(),this.minsDate.getDate() + 16);//set end date 16 days from now
  maxeDate = new Date(this.minsDate.getFullYear(),this.minsDate.getMonth(),this.minsDate.getDate() + 60); // set max edate 60 days from now
  techList: string[] = ['SpringBoot', 'Angular', 'MySQL', 'MS.NET', 'C++', 'ASDM'];
  techs: string[] =[];
  project :Project;
  studentsList: Student[] = [{
    "prn":200240120078,
    "id":6546,
    "role":'',
    "courseName":'',
    "firstName":'Ruthvick',
    "lastName":'',
    "email":'',
    "phoneNumber":'',
    "dateOfBirth":'',
    "userAccount":87857,
    "project":775
  },
  {
    "prn":200240120088,
    "id":6546,
    "role":'',
    "courseName":'',
    "firstName":'Thimothy',
    "lastName":'',
    "email":'',
    "phoneNumber":'',
    "dateOfBirth":'',
    "userAccount":87857,
    "project":775
  },{
    "prn":200240120098,
    "id":6546,
    "role":'',
    "courseName":'',
    "firstName":'Sangeetha',
    "lastName":'',
    "email":'',
    "phoneNumber":'',
    "dateOfBirth":'',
    "userAccount":87857,
    "project":775
  }];
  team: Student[]=[];
  teamControl = new FormControl([]);
  createProjectForm = this.fb.group({
    t_lead:['',[Validators.required]],
    title:['',Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
    description:['',Validators.compose([
      Validators.required, Validators.minLength(50), Validators.maxLength(300)])],
    stime: [moment().unix(), [Validators.required]],
    etime: [moment().unix(), [Validators.required]],
    team: [this.team],
    techs: [this.techs]
  });
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
              private studentService : StudentService,private adminService : AdminService) { }
  
  ngOnInit(): void {
    //api call to get tech list, students with no project list
    this.adminService.getTechnologyList().subscribe((data: any[])=>{
      console.log(data);
      this.techList = data;
    });
    this.studentService.getStudentsWithNoProject().subscribe((data: any[])=>{
      console.log(data);
      this.studentsList = data;
    });

  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }
 

  submitForm() {
    console.log(this.createProjectForm.value);
    //rest api submit form data and close form
    /*const formData = this.fb.group({
      project:this.createProjectForm.value,
     technologies:this.createProjectForm.get('techs').value,
      student:this.createProjectForm.get('teamControl').value,//doubt for student 

    });
    this.studentService.createProject(formData.value)
  .subscribe(data => {
    
    console.log("project created",data);
    
  },
   error => console.log("error",error));*/
    this.dialogRef.close();
  }

  onStudentRemoved(student: Student) {
    const sList = this.team as Student[];
    this.removeFirst(sList, student);
    this.teamControl.setValue(sList); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  

}
