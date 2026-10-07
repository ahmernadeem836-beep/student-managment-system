import { Component, inject, OnInit, signal } from '@angular/core';

import { Student } from '../../../models/student.models';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-student-dashboard',
  imports: [],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class StudentDashboard implements OnInit {
  private readonly studentService = inject(StudentService);

  readonly student = signal<Student | null>(null);
  readonly isLoading = signal(true);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    this.studentService.getCurrentStudent().subscribe({
      next: student => {
        this.student.set(student);
        this.isLoading.set(false);
      },
      error: error => {
        console.error('Failed to load current student:', error);
        this.errorMessage.set('Failed to load your student profile.');
        this.isLoading.set(false);
      }
    });
  }
}