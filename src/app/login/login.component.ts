import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide = true;
  role = '';
  loginForm = this.fb.group({
    email: [null, Validators.compose([
      Validators.required,Validators.email])],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(4), Validators.maxLength(9)])],
  });

  constructor(private fb: FormBuilder,private router: Router,
    private loginService: LoginService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    //check if user logged in redirect
    console.log("--------Inside Home component init-------");
    this.loginService.redirectPath();
  }
  
  get f() { return this.loginForm.controls; }
  onSubmit(){
    if (this.loginForm.invalid) {
      return;
  }else
{
  this.loginService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
              console.log('Login successful');
              console.log(data);
              console.log(JSON.parse(localStorage.getItem('currentUser')));
              console.log(this.loginService.getRole);
              if(data){
                var role ='';
                if(this.loginService.getRole){
                role = this.loginService.getRole.toLowerCase();
                if(role=="admin"){
                  this.loginService.adminDetails=data.user;
                }
                if(role=="student"){
                this.loginService.studentDetails=data.user;
                }
                if(role=="guide"){
                  this.loginService.guideDetails=data.user;
                }
                this.router.navigate(['/'+role]);
                }
                //this.router.navigate(['/'+role]).then(() => {
                //  window.location.reload();
                //});
              }
          },
          error => {
              //alert(error);
              console.log(JSON.stringify(error));
              this.snackBar.open(error.error, 'Ok', {
                duration: 5000,
              });
          });

        }
  }
}
