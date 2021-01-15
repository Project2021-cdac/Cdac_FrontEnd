import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserAccount } from '../models/User-Interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl='http://localhost:8080';
  constructor(private http:HttpClient) { }
  registeUser(email:string ,password:string): Observable<any>{
    const body={email ,password}
    return this.http.post(this.baseUrl + '/user/login', body);
  }
  loginUser(IUserAccount:Object):Observable<Object>{
     return this.http.get<IUserAccount>(this.baseUrl+'/user/login');
  }
}
