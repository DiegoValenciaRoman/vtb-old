import { Component, OnInit } from '@angular/core';

//MODELS
import { UsuarioModel } from '../../../models/usuario.model';

//SERVICES
import { UsuariosService } from "../../../services/usuarios.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioModel[] = [];

  constructor( public _usuariosService: UsuariosService) { }

  ngOnInit(): void {

    this._usuariosService.getUsuarios()
      .subscribe((data: UsuarioModel[]) => {
        console.log(data);
        this.usuarios = data;
      })

  }

  borrarUsuario(usuario: UsuarioModel, index: number) {
    this._usuariosService.borrarUsuario(usuario._id)
      .subscribe((data: UsuarioModel) => {
        console.log("USUARIO BORRADO COMPONENTE");
        console.log(data);
      })
  }

}
