import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../models/login-request.model';
import { BehaviorSubject, tap } from 'rxjs';
import { RegistroUsuarioRequest } from '../../models/registro-usuario-request.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth'
  private tokenKey = 'authToken';

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(request: LoginRequest) {
    return this.http.post(this.apiUrl + "/login", request, { responseType: 'text'}).pipe(
      tap(token => {
        localStorage.setItem(this.tokenKey, token);
        this.loggedIn.next(true);
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
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  forgotPassword(email: string) {
    return this.http.post(this.apiUrl + "/forgot-password", { email },
      {
        responseType: 'text'
      }
    );
  }

  resetPassword(token: string, novaSenha: string) {
    return this.http.post(this.apiUrl + "/reset-password", {
      token,
      novaSenha
    },
    {
      responseType: 'text'
    }
  );
  }

  registrar(data: RegistroUsuarioRequest) {
    return this.http.post(`${this.apiUrl}/registrar`, 
      data, { responseType: 'text' });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
