import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaListagem } from '../../models/reserva-listagem';
import { ReservaRequest } from '../../models/reserva-request.model';
import { AtualizarStatusReserva } from '../../models/atualizar-status-reserva';
import { ReservaResponse } from '../../models/reserva-response';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private readonly apiUrl = 'http://localhost:8080/api/reservas'

  constructor(private http: HttpClient) { }

  listar(): Observable<ReservaListagem[]> {
    return this.http.get<ReservaListagem[]>(`${this.apiUrl}`);
  }

  listarPorCliente(clienteId: number): Observable<ReservaListagem[]> {
    return this.http.get<ReservaListagem[]>(`${this.apiUrl}/${clienteId}`);
  }

  buscarPorId(id: number): Observable<ReservaRequest> {
    return this.http.get<ReservaRequest>(`${this.apiUrl}/${id}`);
  }

  cadastrar(dto: ReservaRequest): Observable<ReservaRequest> {
    return this.http.post<ReservaRequest>(`${this.apiUrl}`, dto);
  }

  atualizar(id: number, dto: ReservaRequest): Observable<ReservaRequest> {
    return this.http.put<ReservaRequest>(`${this.apiUrl}/${id}`, dto);
  }

  atualizarStatus(id: number, dto: AtualizarStatusReserva) : Observable<ReservaResponse> {
    return this.http.patch<ReservaResponse>(`${this.apiUrl}/${id}`, dto);
  }


  realizarCheckIn(id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/check-in/${id}`, null, {
      responseType: 'text'
    });
  }

  realizarCheckOut(id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/check-out/${id}`, null, {
      responseType: 'text'
    });
  }

  cancelar(id: number): Observable<string> {
    return this.http.patch(`${this.apiUrl}/cancelar/${id}`, {}, {
      responseType: 'text'
    });
  }

  confirmarReserva(id: number): Observable<string> {
  return this.http.patch(`${this.apiUrl}/confirmar/${id}`, {}, {
    responseType: 'text'
  });
 }

 consultarStatus(id: number): Observable<string> {
  return this.http.get(`${this.apiUrl}/status/${id}`, {
    responseType: 'text'
  })
 }

 deletar(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
 }

 verificarDisponibilidade(quartoId: number, checkIn: string, checkOut: string): Observable<{disponivel: boolean}> {
  return this.http.get<{disponivel: boolean}>(
    `${this.apiUrl}/disponibilidade`,
    {
      params: {
        quartoId,
        checkIn,
        checkOut
      }
    }
  );
 }

}
