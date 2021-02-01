import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-upload-excel-dialog',
  templateUrl: './upload-excel-dialog.component.html',
  styleUrls: ['./upload-excel-dialog.component.css']
})
export class UploadExcelDialogComponent implements OnInit {
  show:boolean = true;
  fileToUpload: File = null;
  message = '';
  constructor( public dialogRef: MatDialogRef<UploadExcelDialogComponent>,private adminService:AdminService,private snackBar: MatSnackBar) { } 
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.fileToUpload = (target.files as FileList)[0];
  }
  onCancel(): void { 
    this.dialogRef.close(); 
  }
  onSubmit(): void { 
    console.log("::::INSIDE FILE SUBMIT:::" );
    this.show=false;
    this.adminService.registerStudent(this.fileToUpload).subscribe(
      res => {
        if(res.status){
        console.log("succesful" ,res.body);
        this.snackBar.open(res.body.responseMessage, 'Ok', {
        duration: 5000,
        });
        this.dialogRef.close();   
        }},
      error => {
        console.log("failed" ,error);
                this.snackBar.open(error.error.text, 'Ok', {
                  duration: 5000,
                });
                this.dialogRef.close();  
      }
    );
    
    /*this.adminService.registerStudent(this.fileToUpload).subscribe(
      event=>{
        if(event instanceof HttpResponse){
          this.message=event.body.message;
          console.log("--message : ",this.message);
        }
      },
        err=>{
          this.message='could not  upload the file';
          console.log("--message : ",this.message);
        });*/
  } 

  ngOnInit(): void {
  }

}


function requiredFileType( type: string ) {
  return function (control: FormControl) {
    const file = control.value;
    if ( file ) {
      const extension = file.name.split('.')[1].toLowerCase();
      if ( type.toLowerCase() !== extension.toLowerCase() ) {
        return {
          requiredFileType: true
        };
      }
      
      return null;
    }

    return null;
  };
}