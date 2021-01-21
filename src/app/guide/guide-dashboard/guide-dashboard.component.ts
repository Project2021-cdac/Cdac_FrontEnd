import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ChooseProjectDialogComponent } from '../choose-project-dialog/choose-project-dialog.component';
import { Project } from 'src/app/models/project-model';
import { projects } from '../../guide/project-dashboard/example-data';
import { GuideService } from 'src/app/services/guide.service';

@Component({
  selector: 'app-guide-dashboard',
  templateUrl: './guide-dashboard.component.html',
  styleUrls: ['./guide-dashboard.component.css']
})
export class GuideDashboardComponent implements OnInit {
  projects : Project[] = projects;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns :1
        };
      }

      return {
        columns:4,
      };
    })
  );
  errorMessage: any;


  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog,private guideService:GuideService) {}
  ngOnInit(){
    //call api which will show project list assosciated with guide
 /*   this.guideService.guideProjectList(gid).subscribe({    
      next: (data: any[]) => {
        this.projects = data;
        console.log(data);

        
    },
    error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
})*/
}
  openDialog() {
    console.log("inside choose proj open");
    let dialogRef = this.dialog.open(ChooseProjectDialogComponent); 
  }
}
