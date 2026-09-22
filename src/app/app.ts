import { Component, signal } from '@angular/core';
import { StudentCard } from './shared/student-card/student-card';


@Component({
 imports: [StudentCard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('student-management');
  studentName = signal('');
studentCourse = signal('');
  imageUrl = signal('https://placehold.co/300x200');
students = [
  { name: 'Ali', course: 'Computer Science' },
  { name: 'Ahmed', course: 'Software Engineering' },
  { name: 'Sara', course: 'Data Science' }
  
];
  changeTitle() {
  this.title.set('My Students');
}
onStudentDeleted(studentName: string) {
  this.students = this.students.filter(
    student => student.name !== studentName
  );
}
addStudent(event: SubmitEvent) {
  event.preventDefault();

  console.log(this.studentName());
  console.log(this.studentCourse());

  this.studentName.set('');
  this.studentCourse.set('');
}
}
  