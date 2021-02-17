import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from 'src/app/models/project-model';
import { GuideService } from 'src/app/services/guide.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-choose-project-dialog',
  templateUrl: './choose-project-dialog.component.html',
  styleUrls: ['./choose-project-dialog.component.css']
})
export class ChooseProjectDialogComponent implements OnInit {
  @ViewChild(MatSelectionList) result: MatSelectionList;
  selectedOptions
  availableList: Project[]=[];
  form= this.fb.group({
    projects: new FormArray([]) 
  },{validators: this.minSelectedCheckboxes});
  get projFormArray() {
    return this.form.controls.projects as FormArray;
  }
  projIds: number[] =[];
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<ChooseProjectDialogComponent>
              ,private guideService:GuideService,private loginService :LoginService,private snackBar: MatSnackBar) { }

  private addCheckboxes() {
    this.availableList.forEach(() =>
      this.projFormArray.push(new FormControl(false))
    );
  }
  ngOnInit(): void {
    console.log(this.loginService.getGuide);
    this.guideService.guideDetails=this.loginService.getGuide;
    //get avaliabe projects list from api to show in form
    this.guideService.getAvailableProj().subscribe((data: any[])=>{
      console.log(data);
      this.availableList = data;
    })  
    this.addCheckboxes();
  }


  onCancel(): void { 
    this.dialogRef.close(); 
  }
 

  submit() {
    console.log('inside submit');
    console.log(JSON.stringify(this.selectedOptions))
    //this.projIds = this.form.value.projects
    //.map((checked, i) => (checked ? this.availableList[i].id : null))
    //.filter(v => v !== null);
    //api to choose project from list(post)(suvidha----doubt (show to pass single select project id))
   this.guideService.chooseProject(this.guideService.guideDetails.id,this.selectedOptions[0].id).subscribe(() => {
      console.log(" project selected ");
      this.snackBar.open("Project selected", 'Ok', {
        duration: 5000,
        });
        this.dialogRef.close();
    },
     error => console.log("error",error));
  //console.log(this.projIds);
  
  }


  public minSelectedCheckboxes(control: AbstractControl): ValidationErrors | null {
    const selected = control.get('projects') ? control.get('projects').value : [];
    console.log(selected);
    const count = selected
    .reduce((prev, next) => next ? prev + next : prev, 0);
    //console.log(count);
    return count >= 1 ?count > 1 ?{ manyItems: true }: null : { required: true };
            
  }
}



