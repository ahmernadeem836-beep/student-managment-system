import { Injectable, signal } from '@angular/core';
import { Student } from '../models/student.models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

 private students = signal<Student[]>([
  {
    id: 1,
    name: 'Ali',
    email: 'ali@example.com',
    course: 'Computer Science'
  },
  {
    id: 2,
    name: 'Ahmed',
    email: 'ahmed@example.com',
    course: 'Software Engineering'
  },
  {
    id: 3,
    name: 'Sara',
    email: 'sara@example.com',
    course: 'Data Science'
  }
]);
  getStudents() {
    return this.students.asReadonly();
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