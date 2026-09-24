import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { StudentCard } from '../../../shared/student-card/student-card';
import { StudentService } from '../../../services/student.service';

@Component({
  imports: [StudentCard, ReactiveFormsModule],
  selector: 'app-student-list',
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList {
  private studentService = inject(StudentService);

  students = this.studentService.getStudents();

  studentForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),

    course: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  onStudentDeleted(studentId: number) {
    this.studentService.deleteStudent(studentId);
  }

  addStudent(event: SubmitEvent) {
    event.preventDefault();

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const { name, email, course } = this.studentForm.getRawValue();

    this.studentService.addStudent({
      name: name.trim(),
      email: email.trim(),
      course: course.trim()
    });

    this.studentForm.reset();
  }
}