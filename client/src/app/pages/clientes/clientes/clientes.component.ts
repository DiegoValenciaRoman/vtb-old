import { Component, OnInit } from '@angular/core';

// MODELS
import { ClienteModel } from "../../../models/cliente.model";

// SERVICES
import { ClientesService } from "../../../services/clientes.service";
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: ClienteModel[] = [];

  constructor(private _clientesService: ClientesService,
              public _usuariosService: UsuariosService) { }

  ngOnInit(): void {

    this._clientesService.getClientes()
      .subscribe((res: ClienteModel[]) => {
        this.clientes = res;
        console.log(this.clientes);
      })
    
  }

  borrarCliente(_id: string, index: number) {
    this._clientesService.borrarCliente(_id)
      .subscribe(() => {
        this.clientes.splice(index, 1);
      });
    
  }

}
