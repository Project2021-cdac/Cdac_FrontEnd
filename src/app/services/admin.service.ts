import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {catchError } from 'rxjs/operators';
import {IGuide} from '../models/guide-model';
import { IProject } from '../models/project-model';
import { IStudent } from '../models/student-model';
//import { ErrorObservable }  from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl='http://localhost:8080';
  constructor(private http:HttpClient) { }

  registerStudent(IStudent :Object):Observable<Object> {
      return this.http.post(this.baseUrl+'/admin/student/register',IStudent);
  }
  registerGuide(IGuide: Object): Observable<Object> {
    return this.http.post(this.baseUrl+'/admin/guides/register',IGuide);
   /* .pipe(catchError(this.HandleError));*/
  }
  getGuideList():Observable<IGuide[]>{
    return this.http.get<IGuide[]>(this.baseUrl+'/admin/guides')
          
  }
  getProjectList():Observable<IProject[]>{
    return this.http.get<IProject[]>(this.baseUrl+'/admin/projects/list');
  }
  getStudentList():Observable<IStudent[]>{
    return this.http.get<IStudent[]>(this.baseUrl+'/admin/students');
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
