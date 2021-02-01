import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
//import { SelectAutocompleteComponent } from 'mat-select-autocomplete-angular9';
import * as moment from 'moment';
import { Project } from 'src/app/models/project-model';
import { Student } from 'src/app/models/student-model';
import { Technology } from 'src/app/models/technology-model';
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
  techList: Technology[] = [];
  techs: Number[] =[];
  project :Project;
  studentsList: Student[] = [];
  team: Number[]=[];
  technologies: string[] =[];
  teamList :Student[]=[];
  teamControl = new FormControl([]);
  createProjectForm = this.fb.group({
    t_lead:['',Validators.compose([Validators.required,this.checktleadInput(this.studentsList)])],
    title:['',Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
    description:['',Validators.compose([
      Validators.required, Validators.minLength(50), Validators.maxLength(300)])],
    stime: [moment(), [Validators.required]],
    etime: [moment(), [Validators.required]],
    team: [this.team],
    techs: [this.techs]
  });

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
              private studentService : StudentService,private adminService : AdminService) { }
  
  ngOnInit(): void {
    //api call to get tech list
    this.adminService.getTechnologyList().subscribe((data: any[])=>{
      console.log(data);
      this.techList = data;
    });
    //api call to get students with no project list
    this.studentService.getStudentsWithNoProject().subscribe((data: any[])=>{
      console.log(data);
      this.studentsList = data;
    });

  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }
  
 

  submitForm() {
    console.log("------INSIDE CREATE PROJECT--------");
    console.log(this.createProjectForm.get('techs').value);
    console.log(this.teamControl.value);
    var data = 
      {
        "projectTitle": this.createProjectForm.get('title').value,
        "projectDescription":this.createProjectForm.get('description').value,
        "startDate": moment(this.createProjectForm.get('stime').value).format('yyyy-MM-DD'),
        "endDate":  moment(this.createProjectForm.get('etime').value).format('yyyy-MM-DD'),
        "teamLead": this.createProjectForm.get('t_lead').value.toString(),
        "technologies":this.createProjectForm.get('techs').value.map(String),
        "studentPrns": this.teamControl.value.map(String)
    }
    console.log(data);
    console.log(JSON.stringify(data));


    //rest api submit form data and close form(suvidha)
    this.dialogRef.close();
    this.studentService.createProject(data)
  .subscribe(data => {
    
    console.log("project created",data);
    
  },
   error => console.log("error",error));
    
  }
  
  onStudentRemoved(student: Number) {
    const sList = this.team as Number[];
    this.removeFirst(sList, student);
    this.teamControl.setValue(sList); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  
  public checktleadInput(sList): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null =>{
    const selected = control.value? control.value : 0;
    console.log(selected);
    const count = sList.find(x => x.prn == selected);
    console.log(count);
    return count? null : { match: true };
    }
  }


}
