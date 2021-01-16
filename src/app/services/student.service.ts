import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student-model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private http:HttpClient) { }
  getStudent(prn:bigint):Observable<Student>{
    return this.http.get<Student>(`${environment.apiUrl}/student`+prn);
  }

  createProject(Project: Object):Observable<Object> {
      return this.http.post(`${environment.apiUrl}/student/createproject`,Project);

  }
  getStudentsWithNoProject():Observable<Student[]>{
    return this.http.get<Student[]>('${environment.apiUrl}/student/noproject');
  }
}
