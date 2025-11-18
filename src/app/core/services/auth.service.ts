import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth'
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest) {
    return this.http.post(this.apiUrl + "/login", request, { responseType: 'text'}).pipe(
      tap(token => {
        localStorage.setItem(this.tokenKey, token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  forgotPassword(email: string) {
    return this.http.post(this.apiUrl + "/forgot-password", { email });
  }

  resetPassword(token: string, novaSenha: string) {
    return this.http.post(this.apiUrl + "/reset-password", {
      token,
      novaSenha
    });
  }
}
