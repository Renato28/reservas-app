import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuartoRequest } from '../../models/quarto-request.model';

@Injectable({
  providedIn: 'root'
})
export class QuartoService {

  private readonly apiUrl = 'http://localhost:8080/api/quartos'

  constructor(private http: HttpClient) { }

  listar(): Observable<QuartoRequest[]> {
    return this.http.get<QuartoRequest[]>(`${this.apiUrl}`);
  }

  buscarPorId(id: number): Observable<QuartoRequest> {
    return this.http.get<QuartoRequest>(`${this.apiUrl}/${id}`);
  }

  atualizar(id: number, dto: QuartoRequest): Observable<QuartoRequest> {
    return this.http.put<QuartoRequest>(`${this.apiUrl}/${id}`, dto);
  }

  cadastrar(dto: QuartoRequest): Observable<QuartoRequest> {
    return this.http.put<QuartoRequest>(`${this.apiUrl}`, dto);
  }

  consultarStatus(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/status/${id}`, {
      responseType: 'text'
    });
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
