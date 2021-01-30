import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Guide } from '../models/guide-model';
import { Project } from '../models/project-model';
@Injectable({
  providedIn: 'root'
})
export class GuideService {
  projects:Project[];
  guideDetails:Guide;

  constructor(private http:HttpClient) {
    this.getAvailableProj();
    
   }

   getAvailableProj():Observable<Project[]>{
    return this.http.get<Project[]>('${environment.apiUrl}/student/noproject')
    .pipe(catchError(this.handleError));
  }
  chooseProject(gid :number,pid:number):Observable<any>{
    const params=new HttpParams().set('guideid',"gid").set('projectid',"pid");
    return this.http.post<any>(`${environment.apiUrl}/guide/select`,{'params' :params});
  }
  guideProjectList(gid:number):Observable<any>{
    const params=new HttpParams().set('guideid',"gid");
    return this.http.get<any>(`${environment.apiUrl}/guide/projects`,{'params' :params});
  }
  showProject(pid:number):Observable<any>{
    const params=new HttpParams().set('projectid',"gid");
    return this.http.get<any>(`${environment.apiUrl}/guide/project`,{'params' :params});
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
