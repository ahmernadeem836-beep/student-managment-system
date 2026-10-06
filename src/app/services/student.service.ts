import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from '../models/student.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiBaseUrl}/students`;

  private students = signal<Student[]>([]);
  private loading = signal(false);
  private error = signal('');

  getStudents() {
    return this.students.asReadonly();
  }

  getLoading() {
    return this.loading.asReadonly();
  }

  getError() {
    return this.error.asReadonly();
  }

  loadStudents() {
    this.loading.set(true);
    this.error.set('');

    this.http.get<Student[]>(this.apiUrl).subscribe({

      next: students => {
        this.students.set(students);
        this.loading.set(false);
      },

      error: error => {
        console.error(
          'Failed to load students:',
          error
        );

        this.error.set(
          'Failed to load students.'
        );

        this.loading.set(false);
      }

    });
  }

  getStudentById(id: number) {
    return this.http.get<Student>(
      `${this.apiUrl}/${id}`
    );
  }

  updateStudent(
    id: number,
    student: {
      name: string;
      email: string;
      age: number;
      departmentId: number;
      courseIds: number[];
    }
  ) {
    return this.http.patch<Student>(
      `${this.apiUrl}/${id}`,
      student
    );
  }

  createStudent(student: {
    name: string;
    email: string;
    age: number;
    departmentId: number;
    enrolledDate: string;
    courseIds: number[];
  }) {
    return this.http.post(
      this.apiUrl,
      student
    );
  }

  getCurrentStudent() {
    return this.http.get<Student>(`${this.apiUrl}/me`);
  }


  deleteStudent(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}