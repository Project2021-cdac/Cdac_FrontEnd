import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Project } from 'src/app/models/project-model';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent   {
  public projects= [];
  errorMessage: any;
    constructor(private adminService:AdminService,private breakpointObserver: BreakpointObserver){
    
  }
  ngOnInit() {
    this.fetchProjectList();
  }
    fetchProjectList() {
       this.adminService.getProjectList().subscribe({    
        next: data => {
          this.projects = data;
          console.log(data);
  
          
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  })
    }
    
  
  /** Based on the screen size, switch from standard to one column per row */
 /* projects = [{ teamId:'team1',title: 'Project Title 1'},
  { teamId:'team2',title: 'Project Title 2'},
  { teamId:'team3',title: 'Project Title 3'},
  { teamId:'team6',title: 'Project Title 4'},
  { teamId:'team9',title: 'Project Titl eProject Title Project TitleProject Title 5'}];*/
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

 //constructor(private breakpointObserver: BreakpointObserver) {}
}
//};