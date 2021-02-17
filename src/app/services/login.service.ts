import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin-model';
import { Guide } from '../models/guide-model';
import { Student } from '../models/student-model';
import { UserAccount } from '../models/User-Interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private currentUserSubject: BehaviorSubject<UserAccount>;
  public currentUser: Observable<UserAccount>;
  private currentStudentSubject: BehaviorSubject<Student>;
  public studentDetails: Observable<Student>;
  private currentGuideSubject: BehaviorSubject<Guide>;
  public guideDetails: Observable<Guide>;


  constructor(private http: HttpClient,private router: Router) {
      this.currentUserSubject = new BehaviorSubject<UserAccount>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      
      this.currentStudentSubject = new BehaviorSubject<Student>(JSON.parse(localStorage.getItem('student')));
      this.studentDetails = this.currentStudentSubject.asObservable();
      
      
      this.currentGuideSubject = new BehaviorSubject<Guide>(JSON.parse(localStorage.getItem('guide')));
      this.guideDetails = this.currentGuideSubject.asObservable();
      
  }

  public get currentUserValue(): UserAccount {
      return this.currentUserSubject.value;
  }

  public get getStudent(): Student {
    return this.currentStudentSubject.value;
  }

  public get getGuide(): Guide {
    return this.currentGuideSubject.value;
  }

  
  public get isLoggedIn(): boolean{
    console.log("---INSIDE  LOGIN CHECK----"+this.currentUserValue);
    return (this.currentUserValue)?true:false;
  }
  public get getRole(): string{
    console.log("---INSIDE  Role CHECK----"+this.currentUserValue);
    console.log("---INSIDE  Role CHECK----"+JSON.stringify(this.currentUserValue));
    console.log("---INSIDE  Role CHECK----"+this.currentUserValue.role);
    if(this.currentUserValue.role){
      return this.currentUserValue.role.split('_')[1];
    }
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
            console.log("----LOGIN REPLY FROM SERVER-------");
            console.log(user);
              // login successful if there's a jwt token in the response
              if(user){
                console.log(user.token);
                console.log(user.user.userAccount);

                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user.user.userAccount));
                  localStorage.setItem('token', user.token);
                  console.log(user);
                  this.currentUserSubject.next(user.user.userAccount);
                  //store student and guide details according to role
                  if(user.user.userAccount.role == "ROLE_STUDENT"){
                   
                    localStorage.setItem('student', JSON.stringify(user.user));
                    console.log('saved student');
                    this.currentStudentSubject.next(user.user);
                    console.log('saved student');
                  }
                  if(user.user.userAccount.role == "ROLE_GUIDE"){
                    console.log('saved guide');
                    localStorage.setItem('guide', JSON.stringify(user.user));
                    this.currentGuideSubject.next(user.user);
                  }
              }
              console.log(user.user);
              return user.user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      localStorage.removeItem('student');
      localStorage.removeItem('guide');
      localStorage.removeItem('token');
      this.currentUserSubject.next(null);
      this.currentStudentSubject.next(null);
      this.currentGuideSubject.next(null);
      window.location.reload();

  }

    changePswd(password:string,email:string):Observable<any>{
      console.log("------"+password+" ==== "+email);
      return this.http.post(`${environment.apiUrl}/user/changepassword`,{password,email});
    }
  
}
