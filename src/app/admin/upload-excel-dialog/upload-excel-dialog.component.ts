import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-excel-dialog',
  templateUrl: './upload-excel-dialog.component.html',
  styleUrls: ['./upload-excel-dialog.component.css']
})
export class UploadExcelDialogComponent implements OnInit {

  constructor( 
    public dialogRef: MatDialogRef<UploadExcelDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { } 
  
  onCancel(): void { 
    this.dialogRef.close(); 
  }
  onSubmit(): void { 
    
    this.dialogRef.close(this.data); 
  } 

  ngOnInit(): void {
  }

}
