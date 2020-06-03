import { Component, OnInit } from '@angular/core';

//MODELS
import { ProductoModel } from '../../models/producto.model';

//SERVICES
import { ProductosService } from "../../services/productos.service";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: ProductoModel[] = [];

  constructor(private _productosService: ProductosService) { }

  ngOnInit(): void {

    this._productosService.getProductos()
      .subscribe((resp: ProductoModel[]) => {
        this.productos = resp;
      })

  }

  eliminarProducto(producto: ProductoModel,index: number) {
    this._productosService.eliminarProducto(producto._id)
      .subscribe(res => {
        this.productos.splice(index, 1);
      })
  }

}
