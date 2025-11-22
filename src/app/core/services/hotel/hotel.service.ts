import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelRequest } from '../../models/hotel-request.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private readonly apiUrl = 'http://localhost:8080/api/hoteis'

  constructor(private http: HttpClient) { }

  listar(): Observable<HotelRequest[]> {
    return this.http.get<HotelRequest[]>(`${this.apiUrl}`); 
  }

  buscarPorId(id: number): Observable<HotelRequest> {
    return this.http.get<HotelRequest>(`${this.apiUrl}/${id}`);
  }

  cadastrar(dto: HotelRequest): Observable<HotelRequest> {
    return this.http.post<HotelRequest>(`${this.apiUrl}`, dto);
  }

  atualizar(id: number, dto: HotelRequest): Observable<HotelRequest> {
    return this.http.put<HotelRequest>(`${this.apiUrl}/${id}`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
