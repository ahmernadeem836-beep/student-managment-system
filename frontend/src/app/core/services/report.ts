
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface StudentCourseReport {
  student_id: number;
  student_name: string;
  department_name: string;
  course_id: number;
  course_name: string;
  marks_obtained: string | number | null;
  total_marks: string | number;
  result_status: string;
  attendance_percentage: string | number | null;
}

interface ReportResponse {
  success: boolean;
  count: number;
  data: StudentCourseReport[];
}

@Injectable({
  providedIn: 'root',
})
export class Report {
  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiBaseUrl}/reports/student-course-summary`;

  private reports = signal<StudentCourseReport[]>([]);
  private loading = signal(false);
  private error = signal('');

  getReports() {
    return this.reports.asReadonly();
  }

  getLoading() {
    return this.loading.asReadonly();
  }

  getError() {
    return this.error.asReadonly();
  }

  loadReports() {
    this.loading.set(true);
    this.error.set('');

    this.http.get<ReportResponse>(this.apiUrl).subscribe({
      next: response => {
        this.reports.set(response.data);
        this.loading.set(false);
      },
      error: error => {
        console.error('Failed to load reports:', error);
        this.error.set('Failed to load reports.');
        this.loading.set(false);
      },
    });
  }
}
