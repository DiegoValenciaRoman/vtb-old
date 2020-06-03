import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private URL_API = 'http://localhost:3000/api';

  constructor(private http: HttpClient,
              private _authService: AuthService) { }
  
  Options = {
    headers: {
      Authorization: ""
    }
  }

  private request(method: 'post' | 'get' | 'put' | 'delete', id?: string, usuario?: UsuarioModel): Observable<any> {
    this.Options.headers.Authorization = this._authService.getToken();
    let reqBase;

    switch (method) {
      case 'post':
        reqBase = this.http.post(`${this.URL_API}/usuarios`, usuario, this.Options);
        break;

      case 'get':
        if (id) {
          reqBase = this.http.get(`${this.URL_API}/usuarios/${id}`, this.Options);
        } else {
          reqBase = this.http.get(`${this.URL_API}/usuarios`, this.Options);
        }
        break;

      case 'put':
        reqBase = this.http.put(`${this.URL_API}/usuarios/${id}`, usuario, this.Options)
        break;

      case 'delete':
        reqBase = this.http.delete(`${this.URL_API}/usuarios/${id}`, this.Options)
        break;
    }
    const request = reqBase.pipe(
      map((data: any) => {
        return Object.values(data)[1];
      })
    );
    return request;
  }

  getUsuario(_id: string) {
    return this.request('get', _id);
  }

  getUsuarios() {
    return this.request('get');
  }

  borrarUsuario(_id: string) {
    return this.request('delete', _id);
  }

  crearUsuario(usuario: UsuarioModel) {
    return this.request('post', null, usuario);
  }

  actualizarUsuario(usuario: UsuarioModel) {
    return this.request('put', usuario._id, usuario )
  }

}
