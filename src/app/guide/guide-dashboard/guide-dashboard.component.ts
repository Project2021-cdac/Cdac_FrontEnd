import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ChooseProjectDialogComponent } from '../choose-project-dialog/choose-project-dialog.component';
import { Project } from 'src/app/models/project-model';
import { GuideService } from 'src/app/services/guide.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-guide-dashboard',
  templateUrl: './guide-dashboard.component.html',
  styleUrls: ['./guide-dashboard.component.css']
})
export class GuideDashboardComponent implements OnInit {
  projects : Project[];
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


  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog,private guideService:GuideService
                           , private loginService:LoginService) {}
  ngOnInit(){
    this.guideService.guideDetails= this.loginService.getGuide;
    
    console.log("------------------INside guide dashboards------------------------");
    //call api to update guide object 
    this.guideService.getGuide(this.loginService.currentUserValue.id).subscribe(
     (data)=>{
         console.log('got prev guide'+JSON.stringify(data))
         localStorage.setItem('guide', JSON.stringify(data));
      },
      (error)=>{
        console.log('failed'+JSON.stringify(error))
      }
    )
    //call api which will show project list assosciated with guide
    
    this.guideService.guideProjectList(this.loginService.getGuide.id).subscribe({    
      next: (data: any[]) => {
        this.projects = data;
        this.guideService.projects = data;
        console.log(data);
        
    },
    error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
  })
}
  openDialog() {
    console.log("inside choose proj open");
    let dialogRef = this.dialog.open(ChooseProjectDialogComponent); 
    dialogRef.afterClosed().subscribe(result => { 
      console.log("After choose proj dialog close.");
      this.ngOnInit();
    });
  }
}
