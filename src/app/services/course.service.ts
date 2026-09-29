import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../models/course.models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/courses';

  private courses = signal<Course[]>([]);

  getCourses() {
    return this.courses.asReadonly();
  }

  loadCourses() {
    this.http.get<Course[]>(this.apiUrl).subscribe({
      next: courses => {
        this.courses.set(courses);
      },
      error: error => {
        console.error('Failed to load courses:', error);
      }
    });
  }
}