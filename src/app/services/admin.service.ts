import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Student} from '../models/student-model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl='http://localhost:8080';
  constructor(private http:HttpClient) { }

  registerStudent(student :Object):Observable<Object> {
      return this.http.post(this.baseUrl+'/admin/',student);
  }
  registerGuide(guide: Object): Observable<Object> {
    return this.http.post(this.baseUrl+'/admin/',guide);
  }
  getProjectList():Observable<any> {
    return this.http.get(this.baseUrl+'/admin/');
  }
  getStudentList():Observable<any>{
    return this.http.get(this.baseUrl+'/admin/studentList');
  }
}
