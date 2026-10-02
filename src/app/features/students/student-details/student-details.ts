import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.models';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-student-details',
  imports: [RouterLink],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css'
})
export class StudentDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private studentService = inject(StudentService);
  private readonly authService = inject(AuthService);

  readonly isAdmin = this.authService.isAdmin;

  student = signal<Student | null>(null);
  isLoading = signal(true);

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('Student ID:', id);

    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        console.log('DETAIL STUDENT:', student);

        this.student.set(student);
        this.isLoading.set(false);
      },

      error: (error) => {
        console.error('Failed to load student:', error);

        this.isLoading.set(false);
      }
    });
  }
}