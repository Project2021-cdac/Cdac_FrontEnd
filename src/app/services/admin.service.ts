import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {catchError } from 'rxjs/operators';
import {Guide} from '../models/guide-model';
import { Project } from '../models/project-model';
import { Student } from '../models/student-model';
//import { ErrorObservable }  from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  constructor(private http:HttpClient) { }

  registerStudent(Student :Object):Observable<Object> {
      return this.http.post(`${environment.apiUrl}/admin/student/register`,Student);
  }
  registerGuide(Guide: Object): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/admin/guides/register`,Guide);
   /* .pipe(catchError(this.HandleError));*/
  }
  getGuideList():Observable<Guide[]>{
    return this.http.get<Guide[]>(`${environment.apiUrl}/admin/guides`);
          
  }
  getProjectList():Observable<Project[]>{
    return this.http.get<Project[]>(`${environment.apiUrl}/admin/projects/list`);
  }
  getStudentList():Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.apiUrl}/admin/students`);
  }
  getCourseList():Observable<any>{
    return this.http.get(`${environment.apiUrl}/course/list`);
  }
  getTechnologyList():Observable<any>{
    return this.http.get(`${environment.apiUrl}/technology/list`);
  }
  getTeamSize():Observable<any>{
    return this.http.get(`${environment.apiUrl}/admin/teamsize`);
  }
 /* setTeamSize(count:number):Observable<any>{
    return this.http.put(`${environment.apiUrl}/admin/userid`)
  }*/
 //exception handling
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
