import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, type AuthRole } from '../auth/auth.service';

export const authorizeRoles = (...allowedRoles: AuthRole[]): CanActivateFn => () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  return allowedRoles.includes(user.role)
    ? true
    : router.createUrlTree(['/forbidden']);
};