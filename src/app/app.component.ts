import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccount } from './models/User-Interface';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CDAC Projects';
  role = '';
  currentUser: UserAccount;

    constructor(
        private router: Router,
        private loginService: LoginService
    ) {
      if(this.loginService.currentUserValue){
      this.role = this.loginService.currentUserValue.role;
      }
    }

}
