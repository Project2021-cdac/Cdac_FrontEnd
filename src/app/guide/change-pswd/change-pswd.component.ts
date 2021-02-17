import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-change-pswd',
  templateUrl: './change-pswd.component.html',
  styleUrls: ['./change-pswd.component.css']
})
export class ChangePswdComponent implements OnInit {
  email;
  newpswd;
  form: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ChangePswdComponent>,private loginService : LoginService,@Inject(MAT_DIALOG_DATA) data) {
    this.email = data.email;
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      newpswd: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('newpswd', 'confirmPassword')
        
  });
  }

  onCancel(): void { 
    this.dialogRef.close(); 
  }
  onSubmit(): void { 
    console.log("::::INSIDE changepswd SUBMIT:::" );
    console.log("------"+String(this.form.get('newpswd').value)+" ==== "+this.email);
    this.loginService.changePswd(this.form.get('newpswd').value,this.email).pipe().subscribe(
      () => {
        //if(res.status){
        //console.log("succesful" ,res.status);
        this.dialogRef.close();   
      //  }
      },
      error => {
        console.log("failed" ,error);
        this.dialogRef.close();  
      }
    );
    }


}

function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
