import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForgotPasswordRequest } from '../../models/forgot-password-request';
import { Observable } from 'rxjs';
import { ResetPasswordRequest } from '../../models/reset-password-request';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private apiUrl = 'http://localhost:8080/auth'

  constructor(private http: HttpClient) { }

  forgotPassword(dto: ForgotPasswordRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, dto);
  }

  resetPassword(dto: ResetPasswordRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, dto);
  }
}
