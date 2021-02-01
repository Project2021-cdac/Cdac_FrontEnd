import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AdminService } from 'src/app/services/admin.service';
import { LoginService } from 'src/app/services/login.service';
import { Admin } from 'src/app/models/admin-model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  adminData: Admin;
  text="Our project management information system (CPMS) is how information needed to asses a project is organized. It collects and uses project information through one or more students. What we do is help a project team to plan, execute and close their project.Our main objective is to record and report relevant information and the status of various tasks of the project in such a manner as to bring the most critical activities directly to the attention of concerned guides at appropriate level.";
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'DAC', cols: 1, rows: 3 ,text:this.text},
         // { title: 'Graph 2', cols: 1, rows: 1 },
         // { title: 'List 1', cols: 1, rows: 1 },
         // { title: 'List 2', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'DAC', cols: 2, rows: 1 ,text:this.text},
       // { title: 'Graph 2', cols: 1, rows: 1 },
       // { title: 'List 1', cols: 1, rows: 2 },
       // { title: 'List 2', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,private adminService: AdminService,private loginService: LoginService) {}
  ngOnInit(): void {
    this.adminData = this.loginService.adminDetails;
    console.log(this.adminData.userAccount.courseName);
    this.adminService.course = this.adminData.userAccount.courseName;
  }

}
