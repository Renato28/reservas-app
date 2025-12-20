import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {

   private readonly apiUrl = 'http://localhost:8080/api/correios'

  constructor(private http: HttpClient) { }

  buscarCep(cep: string) {
    return this.http.get<any>(`${this.apiUrl}/cep/${cep}`);
  }
}
