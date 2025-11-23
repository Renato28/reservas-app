import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardResumo } from '../../models/dashboard-resumo';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

   private readonly  apiUrl = 'http://localhost:8080/api/dashboard'

  constructor(private http: HttpClient) { }

  getResumo(): Observable<DashboardResumo> {
    return this.http.get<DashboardResumo>(`${this.apiUrl}/resumo`);
  }
}
