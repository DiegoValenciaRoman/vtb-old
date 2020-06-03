import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioModel } from "../models/usuario.model";

export interface TokenPayload {
  rut: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_API = 'http://localhost:3000/api'
  private token: string;

  constructor( private http: HttpClient) { }

  //=========  TOKEN =============//
  guardarToken(token: string): void {
    localStorage.setItem('vtb-user-token', token)
    this.token = token;
  }
  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('vtb-user-token');
    }
    return this.token;
  }

  //========== AUTH ==============//
  login(usuario: TokenPayload) {
    let reqBase = this.http.post(`${this.URL_API}/usuarios/login`, usuario);
    let request = reqBase.pipe(
      map((data: any) => {
        if (data.token) {
          this.guardarToken(data.token);
        }
        console.log(data);
        return data;
      })
    );
    return request;
  }

  logout(): void {
    this.token = null;
    window.localStorage.removeItem('vtb-user-token');
  }

  getUserDetails(): UsuarioModel {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  } 

  isLoggedIn(): boolean {

    const usuarioPayload = this.getUserDetails();
    if (usuarioPayload) {
      return usuarioPayload.exp > Date.now() / 1000;
    }else{
      return false;
    }

  }


}
