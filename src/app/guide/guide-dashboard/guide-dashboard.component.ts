import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ChooseProjectDialogComponent } from '../choose-project-dialog/choose-project-dialog.component';

@Component({
  selector: 'app-guide-dashboard',
  templateUrl: './guide-dashboard.component.html',
  styleUrls: ['./guide-dashboard.component.css']
})
export class GuideDashboardComponent {
  projects = [{ teamId:'team1',title: 'Project Title 1',progress:70},
  { teamId:'team2',title: 'Project Title 2',progress:40},
  { teamId:'team3',title: 'Project Title 3',progress:30},
  { teamId:'team6',title: 'Project Title 4',progress:50},
  { teamId:'team9',title: 'Project Titl eProject Title Project TitleProject Title 5',progress:20}];
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


  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog) {}
  openDialog() {
    console.log("inside choose proj open");
    let dialogRef = this.dialog.open(ChooseProjectDialogComponent); 
  }
}
