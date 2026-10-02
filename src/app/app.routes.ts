import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Forbidden } from './shared/pages/forbidden/forbidden';
import { StudentList } from './features/students/student-list/student-list';
import { StudentDetails } from './features/students/student-details/student-details';
import { StudentForm } from './features/students/student-form/student-form';
import { authGuard } from './core/guards/auth.guard';
import { authorizeRoles } from './core/guards/role.guard';
import { StudentDashboard } from './features/students/student-dashboard/student-dashboard';
export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'forbidden',
    component: Forbidden
  },

  {
  path: 'student-dashboard',
  component: StudentDashboard,
  canActivate: [authGuard, authorizeRoles('student')]
},
  {
  path: 'students/:id/edit',
  component: StudentForm,
  canActivate: [authGuard, authorizeRoles('admin')]
},
{
  path: 'students/:id',
  component: StudentDetails,
  canActivate: [authGuard, authorizeRoles('admin', 'teacher')]
},
{
  path: 'students',
  component: StudentList,
  canActivate: [authGuard, authorizeRoles('admin', 'teacher')]
}
]