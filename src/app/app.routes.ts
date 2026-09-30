import { Routes } from '@angular/router';
import { StudentList } from './features/students/student-list/student-list';
import { StudentDetails } from './features/students/student-details/student-details';
import { StudentForm } from './features/students/student-form/student-form';
export const routes: Routes = [
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