import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  loginForm = this.fb.group({
    email: [null, Validators.compose([
      Validators.required,Validators.email])],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(9)])],
  });

  constructor(private fb: FormBuilder,private router: Router,
    private loginService: LoginService) {}
  
  get f() { return this.loginForm.controls; }
  onSubmit(){
    if (this.loginForm.invalid) {
      return;
  }
{
  this.loginService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate(['/']);
          },
          error => {
              alert(error);
          });

        }
  
  this.router.navigate(['/admin']);
  }
}
