import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080';
  constructor(private http:HttpClient) { }
  getStudent(prn:bigint):Observable<any>{
    return this.http.get(this.baseUrl+'/student/'+prn);
  }

  createProject(Project: Object):Observable<Object> {
      return this.http.post(this.baseUrl+'/student/createProject/',Project);

  }
}
