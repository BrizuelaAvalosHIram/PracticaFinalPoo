import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api/login.php';

  constructor(private http: HttpClient) {}

  // Método para realizar la llamada de inicio de sesión
  login(usuario: string, pass: string): Observable<any> {
    const body = { usuario, pass };
    return this.http.post(this.apiUrl, body);
  }
}
