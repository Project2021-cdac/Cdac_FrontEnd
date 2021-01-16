import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {catchError } from 'rxjs/operators';
import {Guide} from '../models/guide-model';
import { Project } from '../models/project-model';
import { Student } from '../models/student-model';
//import { ErrorObservable }  from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl='http://localhost:8080';
  constructor(private http:HttpClient) { }

  registerStudent(Student :Object):Observable<Object> {
      return this.http.post(this.baseUrl+'/admin/student/register',Student);
  }
  registerGuide(Guide: Object): Observable<Object> {
    return this.http.post(this.baseUrl+'/admin/guides/register',Guide);
   /* .pipe(catchError(this.HandleError));*/
  }
  getGuideList():Observable<Guide[]>{
    return this.http.get<Guide[]>(this.baseUrl+'/admin/guides')
          
  }
  getProjectList():Observable<Project[]>{
    return this.http.get<Project[]>(this.baseUrl+'/admin/projects/list');
  }
  getStudentList():Observable<Student[]>{
    return this.http.get<Student[]>(this.baseUrl+'/admin/students');
  }
  getCourseList():Observable<any>{
    return this.http.get(this.baseUrl+'/course/list');
  }
 /*private HandleError(errorResponse:HttpErrorResponse){
   if(errorResponse.error instanceof ErrorEvent){
     console.error('client Side Error :',errorResponse.error.message);
   } else {
        console.error('Server Side Error:',errorResponse );
   }
   return new ErrorObservable("There is problem with server");
 }
*/  
}
