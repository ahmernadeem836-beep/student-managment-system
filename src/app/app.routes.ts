import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { StudentList } from './features/students/student-list/student-list';
import { StudentDetails } from './features/students/student-details/student-details';
import { StudentForm } from './features/students/student-form/student-form';
export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
  path: 'students/:id/edit',
  component: StudentForm
},
{
  path: 'students/:id',
  component: StudentDetails
},
{
  path: 'students',
  component: StudentList
}
]