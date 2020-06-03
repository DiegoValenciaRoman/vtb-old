import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';

//MODELS
import { ProductoModel } from '../../models/producto.model';

//SERVICES
import { ProductosService } from "../../services/productos.service";


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: ProductoModel={
    _id: '',
    nombre: '',
    precio: 0    
  }; 


  constructor(private _productosService: ProductosService,
              private route: ActivatedRoute) { }
              
      
  ngOnInit() {
    
    const _id = this.route.snapshot.paramMap.get('_id');

    if (_id !== 'nuevo') {
      this._productosService.getProducto(_id)
        .subscribe((producto: ProductoModel) => {
          this.producto = producto;
        });
    }

  }

  guardar(form: NgForm) {

    if (form.invalid) {
      console.log("Formulario no válido");
      return;
    }
    
    if (this.producto._id) {
      this._productosService.actualizarProducto(this.producto)
        .subscribe((res) => {
          console.log(res);
        })
    } else {
      this._productosService.crearProducto(this.producto)
        .subscribe((res) => {
          console.log(res);
        })
    }
    
  }

}
