import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student-model';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task-model';
import { Milestone } from '../models/milestone-model';
import { Project } from '../models/project-model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentDetails:Student;
  taskDetails:Task;//suvidha
  
  constructor(private http:HttpClient) { }
  getStudent(prn:bigint):Observable<Student>{
    return this.http.get<Student>(`${environment.apiUrl}/student/`+prn);
  }

  createProject(data:any):Observable<any> {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    const body=JSON.stringify(data);
    return this.http.post<any>(`${environment.apiUrl}/student/createproject/${this.studentDetails.userAccount.courseName}`,body,{ 'headers': headers });

  }
  getStudentsWithNoProject():Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.apiUrl}/student/noproject/${this.studentDetails.userAccount.courseName}`);
    /*.pipe(catchError(this.handleError));*/
  }

  createTask(data:any):Observable<any>{
      const params=new HttpParams().set('id',"pid");
    const taskBody=JSON.stringify(data);
    return this.http.post<any>(`${environment.apiUrl}/student/createtask`,taskBody,{'params' :params});
  }
  getStudentsTasks():Observable<Task[]>{
    return this.http.get<Task[]>(`${environment.apiUrl}/student/task/${this.studentDetails.prn}`);
  }
  endTask():Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/student/endtask/${this.taskDetails.id}`,null);

  }
  //Milestone api for all users
  getMilestoneForAllUser(pid:number):Observable<Milestone[]>{
    const params=new HttpParams().set('id',"pid");
    return this.http.get<Milestone[]>(`${environment.apiUrl}/milestones`,{'params' :params});
  }
  //list of all milestones
  getMilestone():Observable<Milestone[]>{
    return this.http.get<Milestone[]>(`${environment.apiUrl}/milestone/list`);
  }
  /*
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
  }*/
}
