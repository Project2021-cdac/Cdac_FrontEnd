import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

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

  constructor(private breakpointObserver: BreakpointObserver,public loginService: LoginService) {}
  ngOnInit(): void {
    console.log("-----Init Guide Nav-----");
    this.loginService.redirectPath();
  }
  logout(){
    this.loginService.logout();
}
}
