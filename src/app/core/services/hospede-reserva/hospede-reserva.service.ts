import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HospedeReservaRequest } from '../../models/hospede-reserva-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospedeReservaService {

  private readonly  apiUrl = 'http://localhost:8080/api/hospedes'

  constructor(private http: HttpClient) { }

  adicionar(id: number, dto: HospedeReservaRequest): Observable<any> {
     return this.http.post<any>(`${this.apiUrl}/hospedes/${id}`, dto);
  }
}
