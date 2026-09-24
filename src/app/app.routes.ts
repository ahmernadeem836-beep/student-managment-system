import { Routes } from '@angular/router';
import { StudentList } from './features/students/student-list/student-list';

export const routes: Routes = [
  {
    path: 'students',
    component: StudentList
  },
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  }
];