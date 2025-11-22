import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteRequest } from '../../models/cliente-request.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly apiUrl = 'http://localhost:8080/api/clientes'

  constructor(private http: HttpClient) { }

  listar(): Observable<ClienteRequest[]> {
    return this.http.get<ClienteRequest[]>(`${this.apiUrl}`);
  }

  buscarPorId(id: number): Observable<ClienteRequest> {
    return this.http.get<ClienteRequest>(`${this.apiUrl}/buscar/${id}`);
  }

  buscarPorNome(nome: string): Observable<ClienteRequest> {
    return this.http.get<ClienteRequest>(`${this.apiUrl}/buscar-nome/${nome}`);
  }

  cadastrar(dto: ClienteRequest): Observable<ClienteRequest> {
    return this.http.post<ClienteRequest>(`${this.apiUrl}`, dto);
  }

  atualizar(id: number, dto: ClienteRequest): Observable<ClienteRequest> {
    return this.http.put<ClienteRequest>(`${this.apiUrl}/${id}`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
