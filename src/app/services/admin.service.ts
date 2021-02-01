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
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  course:String;
  projects:Project[] = [];
  constructor(private http:HttpClient, private formBuilder: FormBuilder) {
    //fun to get project list
     this.getProjectList();
   }

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
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    const guidedata=data.guidedata;
    const technologylist=data.technologylist;
    return this.http.post<any>(`${environment.apiUrl}/admin/guides/register`,{ guidedata,technologylist },{ 'headers': headers });
  
  }
  getGuideList():Observable<Guide[]>{
    return this.http.get<Guide[]>(`${environment.apiUrl}/admin/guides/${this.course}`).pipe(map(res => {
      console.log("------Guide List from server-------");
      return res;
          }));
  }
  getProjectList():Observable<Project[]>{
    return this.http.get<Project[]>(`${environment.apiUrl}/admin/projects/list/${this.course}`).pipe(map(res => {
      console.log("------PROJECT LIST FROM SERVER-------");
      return res;
          }));
  }
  getStudentList():Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.apiUrl}/admin/students/${this.course}`).pipe(map(res => {
      console.log("------RESPONSE FROM SERVER-------");
      return res;
          }));
  }
  getCourseList():Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.get(`${environment.apiUrl}/course/list`,{ 'headers': headers });
  }
  getTechnologyList():Observable<any>{
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.get(`${environment.apiUrl}/technology/list`,{ 'headers': headers });
  }
  getTeamSize():Observable<any>{
    return this.http.get(`${environment.apiUrl}/admin/teamsize`);
  }

  setTeamSize(count:number,userid:number):Observable<any>{
    const params=new HttpParams().set('size','count');
    return this.http.put(`${environment.apiUrl}/admin/${userid}/teamsize?`,{'params' :params});
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
