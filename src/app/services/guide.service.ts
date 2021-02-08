import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Guide } from '../models/guide-model';
import { Milestone } from '../models/milestone-model';
import { Project } from '../models/project-model';
@Injectable({
  providedIn: 'root'
})
export class GuideService {
  projects:Project[];
  guideDetails:Guide;

  constructor(private http:HttpClient) {}

  getGuide(uid:number):Observable<any>{
     return this.http.get<Milestone[]>(`${environment.apiUrl}/guide/${uid}`);
  }
  getAvailableProj():Observable<Project[]>{
    return this.http.get<Project[]>(`${environment.apiUrl}/guide/availableprojects/${this.guideDetails.userAccount.courseName}`)
    .pipe(catchError(this.handleError));
  }
  chooseProject(gid :number,pid:number):Observable<any>{
   // const params=new HttpParams().set('guideid',String(gid)).set('projectid',String(pid));
    return this.http.post<any>(`${environment.apiUrl}/guide/select?guideId=${gid}&projectId=${pid}`,{});
  }
  guideProjectList(gid:number):Observable<any>{
    const params=new HttpParams().set('guideId',String(gid));
    return this.http.get<any>(`${environment.apiUrl}/guide/projects`,{'params' :params}).pipe(map(res => {
      console.log("------RESPONSE FROM SERVER(Project list)-------");
      return res;
          }));
  }
  showProject(pid:number):Observable<any>{
    const params=new HttpParams().set('projectId',String(pid));
    return this.http.get<any>(`${environment.apiUrl}/project`,{'params' :params});
  }
  startsession(pid:number):Observable<any>{
    //const params=new HttpParams().set('projectid',String(pid));
    return this.http.post<any>(`${environment.apiUrl}/guide/startsession?projectId=${pid}`,{});
  }
  endsession(sessionid:number):Observable<any>{
   //const params=new HttpParams().set('sessionid',String(sessionid));
    return this.http.post<any>(`${environment.apiUrl}/guide/endsession?sessionId=${sessionid}`,{});
  }

  getsession(gid:number){
    return this.http.get<any>(`${environment.apiUrl}/guide/getsession/${gid}`);
  }

   //Milestone api for all users
   getMilestoneForAllUser(pid:number):Observable<Milestone[]>{
    //const params=new HttpParams().set('id',String(pid));
    return this.http.get<Milestone[]>(`${environment.apiUrl}/milestones/${pid}`);
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
