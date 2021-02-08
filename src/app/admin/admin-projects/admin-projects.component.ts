import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Project } from 'src/app/models/project-model';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { projects } from '../project-dashboard/example-data';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent   {
  projects:any[]= [];
  errorMessage: any;
  
  constructor(private adminService:AdminService,private loginService: LoginService,private breakpointObserver: BreakpointObserver){}

  ngOnInit() {
    this.fetchProjectList();
  }
  
  fetchProjectList() {
       this.adminService.getProjectList(this.loginService.currentUserValue.courseName).subscribe({    
        next: data => {
          this.projects = data;
          this.adminService.projects=data;
          console.log(data);
        },
       error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
    })
  }
    
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

 
}
