import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-team-size',
  templateUrl: './edit-team-size.component.html',
  styleUrls: ['./edit-team-size.component.css']
})
export class EditTeamSizeComponent implements OnInit {
  size;
  course;
  form: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditTeamSizeComponent>,private adminService:AdminService,private snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) data) { 
    this.course = data.course;
    this.size = data.size;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      size: [this.size, [Validators.required]],
  });
  }
  onCancel(): void { 
    this.dialogRef.close(); 
  }
  onSubmit(): void { 
    console.log("::::INSIDE TeamSize SUBMIT:::" );
    console.log("------"+String(this.form.get('size').value)+" ==== "+this.course);
    this.adminService.setTeamSize(this.form.get('size').value,this.course).pipe().subscribe(
      () => {
        //if(res.status){
        //console.log("succesful" ,res.status);
        this.dialogRef.close();   
      //  }
      },
      error => {
        console.log("failed" ,error);
                this.snackBar.open('Some problem in updating team size, try again.', 'Ok', {
                  duration: 5000,
                });
                this.dialogRef.close();  
      }
    );
    }
}
