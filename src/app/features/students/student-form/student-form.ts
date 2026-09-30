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

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { StudentService } from '../../../services/student.service';
import { DepartmentService } from '../../../services/department.service';
import { CourseService } from '../../../services/course.service';
import { CourseMultiSelect } from '../../../shared/course-multi-select/course-multi-select';

@Component({
  selector: 'app-student-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CourseMultiSelect
  ],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css'
})
export class StudentForm implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private studentService = inject(StudentService);
  private departmentService = inject(DepartmentService);
  private courseService = inject(CourseService);

  studentId!: number;

  isLoading = signal(true);

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

  ngOnInit(): void {

    this.departmentService.loadDepartments();
    this.courseService.loadCourses();

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      console.log('EDIT PARAM ID:', id);

      if (!id) {

        console.error(
          'Student ID not found in route'
        );

        this.isLoading.set(false);

        return;
      }

      this.studentId = Number(id);

      this.studentService
        .getStudentById(this.studentId)
        .subscribe({

          next: student => {

            console.log(
              'EDIT STUDENT:',
              student
            );

            this.studentForm.patchValue({

              name: student.name,

              email: student.email,

              age: student.age,

              departmentId: student.department_id,

              courseIds: student.courseIds ?? []

            });

            this.isLoading.set(false);
          },

          error: error => {

            console.error(
              'Failed to load student:',
              error
            );

            this.isLoading.set(false);
          }

        });

    });
  }

  updateStudent(): void {

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

    this.studentService
      .updateStudent(
        this.studentId,
        {
          name: name.trim(),
          email: email.trim(),
          age: age!,
          departmentId: departmentId!,
          courseIds
        }
      )
      .subscribe({

        next: () => {

          this.router.navigate([
            '/students',
            this.studentId
          ]);

        },

        error: error => {

          console.error(
            'Failed to update student:',
            error
          );

        }

      });
  }
}