import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/models/project-model';
import { GuideService } from 'src/app/services/guide.service';

@Component({
  selector: 'app-choose-project-dialog',
  templateUrl: './choose-project-dialog.component.html',
  styleUrls: ['./choose-project-dialog.component.css']
})
export class ChooseProjectDialogComponent implements OnInit {
  availableList = [
    {
        "id":1233,
        "projectTitle":"title1",
        "projectDescription":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "technologies":"Spring,Mysql,Angular"
    },
    {
        "id":1234,
        "projectTitle":"title2",
        "projectDescription":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "technologies":"Spring,Mysql,Angular"
    },
    {
        "id":1235,
        "projectTitle":"title3",
        "projectDescription":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "technologies":"Spring,Mysql,Angular"
    }
]
;
  form= this.fb.group({
    projects: new FormArray([]) 
  },{validators: this.minSelectedCheckboxes});
  get projFormArray() {
    return this.form.controls.projects as FormArray;
  }
  projIds: number[] =[];
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<ChooseProjectDialogComponent>,private guideService:GuideService) { }

  private addCheckboxes() {
    this.availableList.forEach(() =>
      this.projFormArray.push(new FormControl(false))
    );
  }
  ngOnInit(): void {

    //get avaliabe projects list from api to show in form
    //this.guideService.getAvailableProj().subscribe((data: any[])=>{
    //  console.log(data);
    //  this.availableList = data;
    //})  
    this.addCheckboxes();
  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }
 

  submit() {
    console.log('inside submit');
    this.projIds = this.form.value.projects
    .map((checked, i) => (checked ? this.availableList[i].id : null))
    .filter(v => v !== null);

  console.log(this.projIds);
    this.dialogRef.close();
  }


  public minSelectedCheckboxes(control: AbstractControl): ValidationErrors | null {
    const selected = control.get('projects') ? control.get('projects').value : [];
    //console.log(selected);
    const count = selected
    .reduce((prev, next) => next ? prev + next : prev, 0);
    //console.log(count);
    return count >= 1 ? null : { required: true };
            
  }
}



