import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelRequest } from '../../models/hotel-request.model';
import { HotelResponse } from '../../models/hotel-response.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private readonly apiUrl = 'http://localhost:8080/api/hoteis'

  constructor(private http: HttpClient) { }

  listar(): Observable<HotelResponse[]> {
    return this.http.get<HotelResponse[]>(`${this.apiUrl}`); 
  }

  buscarPorId(id: number): Observable<HotelResponse> {
    return this.http.get<HotelResponse>(`${this.apiUrl}/${id}`);
  }

  cadastrar(dto: HotelRequest): Observable<HotelResponse> {
    return this.http.post<HotelResponse>(`${this.apiUrl}`, dto);
  }

  atualizar(id: number, dto: HotelRequest): Observable<HotelResponse> {
    return this.http.put<HotelResponse>(`${this.apiUrl}/${id}`, dto);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
