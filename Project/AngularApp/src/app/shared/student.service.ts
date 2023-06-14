import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  selectedStudent!: Student;
  students!: Student[];
  
  readonly baseURL = 'http://localhost:3000/students';

  constructor(public http: HttpClient) { }

  postStudent(stu: Student) {
    return this.http.post(this.baseURL, stu);
  }

  getStudentList() {
    return this.http.get(this.baseURL);
  }

  putStudent(stu: Student) {
    return this.http.put(this.baseURL + `/${stu._id}`, stu);
  }

  deleteStudent(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  
}
