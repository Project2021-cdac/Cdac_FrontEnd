import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ChooseProjectDialogComponent } from '../choose-project-dialog/choose-project-dialog.component';
import { Project } from 'src/app/models/project-model';
import { projects } from '../../guide/project-dashboard/example-data';

@Component({
  selector: 'app-guide-dashboard',
  templateUrl: './guide-dashboard.component.html',
  styleUrls: ['./guide-dashboard.component.css']
})
export class GuideDashboardComponent {
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


  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog) {}
  openDialog() {
    console.log("inside choose proj open");
    let dialogRef = this.dialog.open(ChooseProjectDialogComponent); 
  }
}
