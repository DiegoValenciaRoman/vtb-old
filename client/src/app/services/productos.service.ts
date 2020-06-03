import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductoModel } from '../models/producto.model';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private URL_API = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }


  getProductos() {
    return this.http.get(`${this.URL_API}/productos`)
      .pipe(
        map(resp => Object.values(resp)[1])
        //map(resp=>this.getData(resp))
      );
  }

  getProducto(_id: string) {
    return this.http.get(`${this.URL_API}/productos/${_id}`)
      .pipe(
        map(res => Object.values(res)[1])
      );
  }
  
  crearProducto(producto: ProductoModel) {
    return this.http.post(`${this.URL_API}/productos`, producto)
      .pipe(
        map(res=> Object.values(res)[1])
      )
  }

  actualizarProducto(producto: ProductoModel) {
    return this.http.put(`${this.URL_API}/productos/${producto._id}`, producto)
      .pipe(
        map(res=> Object.values(res)[1])
      )
  }

  eliminarProducto(_id: string) {
    return this.http.delete(`${this.URL_API}/productos/${_id}`)
      .pipe(
        map(res => Object.values(res)[1])
      )
  }

  /*
  private getData(productoObj: Object) {

    if (productoObj === null) {
      return [];
    }
    let values = Object.values(productoObj);
    return values[1];
  }
  */
}
  
