import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student-model';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/project-model';
import { Technology } from '../models/technology-model';
import { Task } from '../models/task-model';
import { Milestone } from '../models/milestone-model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private http:HttpClient) { }
  getStudent(prn:bigint):Observable<Student>{
    return this.http.get<Student>(`${environment.apiUrl}/student/`+prn);
  }

  createProject(project: Project,tecnhology:Technology[],student: Student[]):Observable<any> {
     
    const projBody=JSON.stringify(project);
    const techBody=JSON.stringify(tecnhology);
    const studBody=JSON.stringify(student);

      return this.http.post<any>(`${environment.apiUrl}/student/createproject`,{projBody,techBody,studBody});

  }
  getStudentsWithNoProject():Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.apiUrl}/student/noproject`)
    .pipe(catchError(this.handleError));
  }

  createTask(task:Task,pid:number,mid:number):Observable<any>{
      const taskBody=JSON.stringify(task);
    return this.http.post<any>(`${environment.apiUrl}/student/createtask/`+pid,{taskBody,mid});
  }
  getMilestone(pid:number):Observable<Milestone[]>{
    return this.http.get<Milestone[]>(`${environment.apiUrl}/student/milestones/`+pid);
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
