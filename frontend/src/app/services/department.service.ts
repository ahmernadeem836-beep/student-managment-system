import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Department } from '../models/department.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiBaseUrl}/departments`;

  private departments = signal<Department[]>([]);

  getDepartments() {
    return this.departments.asReadonly();
  }

  loadDepartments() {
    this.http.get<Department[]>(this.apiUrl).subscribe({
      next: departments => {
        this.departments.set(departments);
      },
      error: error => {
        console.error('Failed to load departments:', error);
      }
    });
  }
}