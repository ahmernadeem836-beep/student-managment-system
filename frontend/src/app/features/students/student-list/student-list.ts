import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { DepartmentService } from '../../../services/department.service';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { AuthService } from '../../../core/auth/auth.service';

import { StudentCard } from '../../../shared/student-card/student-card';
import { CourseMultiSelect } from '../../../shared/course-multi-select/course-multi-select';

@Component({
  imports: [
    StudentCard,
    ReactiveFormsModule,
    CourseMultiSelect
  ],
  selector: 'app-student-list',
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList implements OnInit {

  private studentService = inject(StudentService);
  private departmentService = inject(DepartmentService);
  private courseService = inject(CourseService);
  private readonly authService = inject(AuthService);

  readonly isAdmin = this.authService.isAdmin;

  students = this.studentService.getStudents();
  isLoading = this.studentService.getLoading();
  errorMessage = this.studentService.getError();
  isSaving = signal(false);
  saveError = signal('');

  departments = this.departmentService.getDepartments();
  courses = this.courseService.getCourses();

  studentForm = new FormGroup({

    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),

    age: new FormControl<number | null>(null, {
      validators: [
        Validators.required
      ]
    }),

    departmentId: new FormControl<number | null>(null, {
      validators: [
        Validators.required
      ]
    }),

    courseIds: new FormControl<number[]>([], {
      nonNullable: true
    })

  });

  ngOnInit() {
    this.studentService.loadStudents();
    this.departmentService.loadDepartments();
    this.courseService.loadCourses();
  }

  onStudentDeleted(studentId: number) {
    if (!window.confirm('Delete this student? This action cannot be undone.')) {
      return;
    }

    this.studentService
      .deleteStudent(studentId)
      .subscribe({

        next: () => {
          this.studentService.loadStudents();
        },

        error: error => {
          console.error(
            'Failed to delete student:',
            error
          );
        }

      });
  }

  addStudent(event: SubmitEvent) {

    event.preventDefault();

    if (this.isSaving()) {
      return;
    }

    if (this.studentForm.invalid) {

      this.studentForm.markAllAsTouched();

      return;
    }

    const {
      name,
      email,
      age,
      departmentId,
      courseIds
    } = this.studentForm.getRawValue();

    this.isSaving.set(true);
    this.saveError.set('');

    this.studentService
      .createStudent({

        name: name.trim(),

        email: email.trim(),

        age: age!,

        departmentId: departmentId!,

        enrolledDate:
          new Date()
            .toISOString()
            .split('T')[0],

        courseIds

      })
      .subscribe({

        next: () => {

          this.isSaving.set(false);
          this.studentForm.reset();

          this.studentService.loadStudents();

        },

        error: error => {

          console.error(
            'Failed to create student:',
            error
          );
          this.saveError.set(
            'Unable to create student. Check the details and try again.'
          );
          this.isSaving.set(false);

        }

      });
  }
}