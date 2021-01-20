import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project-model';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { projects } from '../guide/project-dashboard/example-data';
@Injectable({
  providedIn: 'root'
})
export class GuideService {
  projects:Project[] = projects;

  constructor(private http:HttpClient) {
   
   }

   getAvailableProj():Observable<Project[]>{
    return this.http.get<Project[]>('${environment.apiUrl}/student/noproject')
    .pipe(catchError(this.handleError));
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
