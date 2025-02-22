import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { StudentService } from '../shared/student.service';
import { Student } from '../shared/student.model';

declare var M: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService]
})
export class StudentComponent {
constructor(public studentService: StudentService){}

ngOnInit(){
  this.resetForm();
  this.refreshStudentList();
}

resetForm(form?: NgForm) {
  if (form)
    form.reset();
  this.studentService.selectedStudent = {
    _id: "",
    firstName: "",
    lastName: "",
    uniqueNumber: "",
    facNumber: NaN,
    birthDate: new Date(0)
  }
}

onSubmit(form: NgForm) {
  if (form.value._id == "") {
    this.studentService.postStudent(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshStudentList();
      M.toast({ html: 'Saved successfully', classes: 'rounded' });
    });
  }
  else {
    this.studentService.putStudent(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshStudentList();
      M.toast({ html: 'Updated successfully', classes: 'rounded' });
    });
  }
}

refreshStudentList() {
  this.studentService.getStudentList().subscribe((res) => {
    this.studentService.students = res as Student[];
  });
}

onEdit(stu: Student) {
  this.studentService.selectedStudent = stu;
}

onDelete(_id: string, form: NgForm) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.studentService.deleteStudent(_id).subscribe((res) => {
      this.refreshStudentList();
      this.resetForm(form);
      M.toast({ html: 'Deleted successfully', classes: 'rounded' });
    });
  }
}

}

