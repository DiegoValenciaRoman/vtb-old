import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "../services/auth.service";
import { map } from 'rxjs/operators';
import { ClienteModel } from '../models/cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private URL_API = 'http://localhost:3000/api/'
  
  constructor(private http: HttpClient,
              private _authService: AuthService) { }
  
  Options = {
    headers: {
      Authorization: ""
    }
  }

  private request(method: 'post' | 'get' | 'put' | 'delete', id?: string, cliente?:ClienteModel):Observable<any> {
    this.Options.headers.Authorization = this._authService.getToken();
    let reqBase;

    switch (method) {
      case 'post':
        reqBase = this.http.post(`${this.URL_API}/clientes`, cliente, this.Options);
        break;
      
      case 'get':
        if (id) {
          reqBase = this.http.get(`${this.URL_API}/clientes/${id}`, this.Options);
        }else{
          reqBase = this.http.get(`${this.URL_API}/clientes`, this.Options);
        }        
        break;
      
      case 'put':
        reqBase = this.http.put(`${this.URL_API}/clientes/${id}`,cliente, this.Options)    
        break;
      
      case 'delete':
        reqBase = this.http.delete(`${this.URL_API}/clientes/${id}`, this.Options)    
        break;
    }
    
    const request = reqBase.pipe(
      map((data: any) => {
        return Object.values(data)[1];
      })
    );

    return request;
  }


  crearCliente(cliente: ClienteModel) {
    return this.request('post', null, cliente);  
  }

  getClientes() {
    return this.request('get');
  }

  getCliente(id: string) {
    return this.request('get', id);  
  }

  actualizarCliente(cliente: ClienteModel) {
    return this.request('put', cliente._id, cliente);
  }

  borrarCliente(_id: string) {
    return this.request('delete', _id);  
  }

}
