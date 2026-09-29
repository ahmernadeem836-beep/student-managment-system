import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from '../models/student.models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/students';

  private students = signal<Student[]>([]);

  getStudents() {
    return this.students.asReadonly();
  }

  loadStudents() {
    this.http.get<Student[]>(this.apiUrl).subscribe({
      next: students => {
        this.students.set(students);
      },
      error: error => {
        console.error('Failed to load students:', error);
      }
    });
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

  addStudent(student: Omit<Student, 'id'>) {
    this.students.update(currentStudents => [
      ...currentStudents,
      {
        id: Date.now(),
        ...student
      }
    ]);
  }

  deleteStudent(id: number) {
    this.students.update(currentStudents =>
      currentStudents.filter(student => student.id !== id)
    );
  }
}