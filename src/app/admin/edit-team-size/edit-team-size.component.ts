import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-team-size',
  templateUrl: './edit-team-size.component.html',
  styleUrls: ['./edit-team-size.component.css']
})
export class EditTeamSizeComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<EditTeamSizeComponent>,private adminService:AdminService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  onCancel(): void { 
    this.dialogRef.close(); 
  }
  onSubmit(): void { 
    console.log("::::INSIDE TeamSize SUBMIT:::" );
    
   /* this.adminService.registerStudent(this.fileToUpload).subscribe(
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
    );*/
    }
}
