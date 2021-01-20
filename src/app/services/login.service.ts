import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserAccount } from '../models/User-Interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  private currentUserSubject: BehaviorSubject<UserAccount>;
  public currentUser: Observable<UserAccount>;

  constructor(private http: HttpClient,private router: Router) {
      this.currentUserSubject = new BehaviorSubject<UserAccount>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserAccount {
      return this.currentUserSubject.value;
  }
  public get isLoggedIn(): boolean{
    return (this.currentUserValue)?true:false;
  }
  public get getRole(): string{
    return this.currentUserValue.role;
  }
  public redirectPath(): void{
    if(this.isLoggedIn){
        this.router.navigate(['/'+this.getRole.toLowerCase()]);
        console.log(this.getRole+'ROLE');
      }else{
        console.log('----No user info cached redirecting to login----');
        this.router.navigate(['/login']);
      }

  }
  login(email: string, password: string) {
      console.log('Getting inside login service');
      return this.http.post<any>(`${environment.apiUrl}/user/login`, { email, password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user) {
                console.log(user.token);
                console.log(user.userAccount);

                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user.userAccount));
                  localStorage.setItem('token', user.token);
                  console.log(user);
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      window.location.reload();

  }
}
