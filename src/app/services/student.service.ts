import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student-model';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task-model';
import { Milestone } from '../models/milestone-model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentDetails:Student;

  constructor(private http:HttpClient) { }
  getStudent(prn:bigint):Observable<Student>{
    return this.http.get<Student>(`${environment.apiUrl}/student/`+prn);
  }

  createProject(data:any):Observable<any> {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    const body=JSON.stringify(data);
    console.log(data);
      return this.http.post<any>(`${environment.apiUrl}/student/createproject`,{body},{ 'headers': headers });

  }
  getStudentsWithNoProject():Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.apiUrl}/student/noproject`)
    .pipe(catchError(this.handleError));
  }

  createTask(data:any):Observable<any>{
      const params=new HttpParams().set('id',"pid");
    const taskBody=JSON.stringify(data);
    return this.http.post<any>(`${environment.apiUrl}/student/createtask`,taskBody,{'params' :params});
  }
  getMilestone(pid:number):Observable<Milestone[]>{
    const params=new HttpParams().set('id',"pid");
    return this.http.get<Milestone[]>(`${environment.apiUrl}/student/milestones`,{'params' :params});
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
