import { Component, inject, input, output } from '@angular/core';
import { Student } from '../../models/student.models';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
@Component({
imports: [RouterLink],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
  private readonly authService = inject(AuthService);

  readonly isAdmin = this.authService.isAdmin;
  student = input.required<Student>();
  studentDeleted = output<number>();
}