import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

export type AuthRole = 'admin' | 'teacher' | 'student';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: AuthRole;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    typeof user['id'] === 'number' &&
    Number.isInteger(user['id']) &&
    typeof user['username'] === 'string' &&
    typeof user['email'] === 'string' &&
    (user['role'] === 'admin' ||
      user['role'] === 'teacher' ||
      user['role'] === 'student')
  );
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/auth/login';
  private readonly userState = signal<AuthUser | null>(this.restoreUser());
  private readonly tokenState = signal<string | null>(this.readStoredToken());

  readonly currentUser = this.userState.asReadonly();
  readonly isAuthenticated = computed(() => this.userState() !== null);

  login(login: string, password: string): Observable<LoginResponse> {
    const request: LoginRequest = { login, password };

    return this.http.post<LoginResponse>(this.apiUrl, request).pipe(
      tap(({ user, token }) => {
        this.userState.set(user);
        this.tokenState.set(token);

        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(AUTH_TOKEN_KEY, token);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        }
      })
    );
  }

  getToken(): string | null {
    return this.tokenState();
  }

  logout(): void {
    this.userState.set(null);
    this.tokenState.set(null);

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }

  private restoreUser(): AuthUser | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    try {
      const storedUser = localStorage.getItem(AUTH_USER_KEY);

      if (!storedUser) {
        return null;
      }

      const user: unknown = JSON.parse(storedUser);
      return isAuthUser(user) ? user : null;
    } catch {
      return null;
    }
  }

  private readStoredToken(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
}