import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {Guide} from '../models/guide-model';
import { Project } from '../models/project-model';
import { Student } from '../models/student-model';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { CreateGuide } from '../models/regGuide';
import { FormBuilder } from '@angular/forms';
import { projects } from '../admin/project-dashboard/example-data';
import { Milestone } from '../models/milestone-model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  projects:any[];
  constructor(private http:HttpClient, private formBuilder: FormBuilder) {}

  registerStudent(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers= new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*');
    const req = new HttpRequest('POST', `${environment.apiUrl}/admin/students/register`,formData,{ 'headers': headers });
    return this.http.request(req);
  }
 

  registerGuide(data: any): Observable<any> {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json');
    /*.set('Access-Control-Allow-Origin', '*');*/
    const guidedata=data.guidedata;
    const technologylist=data.technologylist;
    return this.http.post<any>(`${environment.apiUrl}/admin/guides/register`,{ guidedata,technologylist }/*,{ 'headers': headers }*/);
  
  }
  getGuideList(course:string):Observable<Guide[]>{
    return this.http.get<Guide[]>(`${environment.apiUrl}/admin/guides/${course}`).pipe(map(res => {
      console.log("------Guide List from server-------");
      return res;
          }));
  }
  getProjectList(course:string):Observable<Project[]>{
    return this.http.get<Project[]>(`${environment.apiUrl}/admin/projects/list/${course}`).pipe(map(res => {
      console.log("------PROJECT LIST FROM SERVER-------");
      return res;
          }));
  }
  getStudentList(course:string):Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.apiUrl}/admin/students/${course}`).pipe(map(res => {
      console.log("------RESPONSE FROM SERVER-------");
      return res;
          }));
  }
  getCourseList():Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json');
    /*.set('Access-Control-Allow-Origin', '*');*/
    return this.http.get(`${environment.apiUrl}/course/list`,{ 'headers': headers });
  }
  getTechnologyList():Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json');
/*.set('Access-Control-Allow-Origin', '*');*//*suvidha*/
    return this.http.get(`${environment.apiUrl}/technology/list`,{ 'headers': headers });
  }
  getTeamSize(course:String):Observable<any>{
    return this.http.get(`${environment.apiUrl}/admin/teamsize/${course}`);
  }

  setTeamSize(count:number,course:string):Observable<any>{
    console.log("------"+String(count)+" ==== "+course);
   // const params=new HttpParams().set('size',String(count));
   // console.log(params.toString());
    return this.http.post(`${environment.apiUrl}/admin/${course}/setsize/${count}`,{});
  }

  showProject(pid:number):Observable<any>{
    const params=new HttpParams().set('projectId',String(pid));
    return this.http.get<any>(`${environment.apiUrl}/project`,{'params' :params});
  }

   //Milestone api for all users
   getMilestoneForAllUser(pid:number):Observable<Milestone[]>{
    //const params=new HttpParams().set('id',String(pid));
    return this.http.get<Milestone[]>(`${environment.apiUrl}/milestones/${pid}`);
  }
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
