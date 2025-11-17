import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth/login'
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest) {
    return this.http.post(this.apiUrl, request, { responseType: 'text'}).pipe(
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
}
