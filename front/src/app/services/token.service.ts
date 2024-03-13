import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode }from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  // Método para verificar la validez del token
  isTokenValid(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.log("Ha ocurrido un error al validar el token", error);
      return false;
    }
  }
  
  
  getToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(token); // Parsea el token almacenado como cadena JSON
    }
    return '';
  }
}
