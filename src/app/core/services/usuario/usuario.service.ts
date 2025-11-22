import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = 'http://localhost:8080/api/usuarios'

  constructor(private http: HttpClient) { }

  cadastrar(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, usuario);
  }

  ativar(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, {});
  }

   inativar(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, {});
  }
  
}
