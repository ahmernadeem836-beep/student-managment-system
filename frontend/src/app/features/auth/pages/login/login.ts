import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, type LoginResponse } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  readonly loginForm = new FormGroup({
    login: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  submit(): void {
    if (this.isLoading()) {
      return;
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.isLoading.set(true);

    const { login, password } = this.loginForm.getRawValue();

    this.authService.login(login.trim(), password).subscribe({
      next: ({ user }: LoginResponse) => {
        this.isLoading.set(false);
        const destination = user.role === 'student'
          ? '/student-dashboard'
          : '/students';
        void this.router.navigateByUrl(destination);
      },
      error: (error: unknown) => {
        this.errorMessage.set(this.getErrorMessage(error));
        this.isLoading.set(false);
      }
    });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      return 'The username or password was not recognized.';
    }

    if (error instanceof HttpErrorResponse && error.status === 0) {
      return 'Unable to connect. Check your connection and try again.';
    }

    return 'Sign-in failed. Please try again.';
  }
}