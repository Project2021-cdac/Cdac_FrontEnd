import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePswdComponent } from '../change-pswd/change-pswd.component';

@Component({
  selector: 'app-guide-nav',
  templateUrl: './guide-nav.component.html',
  styleUrls: ['./guide-nav.component.css']
})
export class GuideNavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,public loginService: LoginService,public dialog: MatDialog) {}
  ngOnInit(): void {
    console.log("-----Init Guide Nav-----");
    this.loginService.redirectPath();
  }
  logout(){
    this.loginService.logout();
    }
    openDialog() {
      console.log("inside change password open");
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false;
      dialogConfig.data = {
        email: this.loginService.currentUserValue.email
    };
      let dialogRef = this.dialog.open(ChangePswdComponent,dialogConfig); 
    }

}
